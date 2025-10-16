import Dexie from 'dexie';

export const db = new Dexie('jobTrackerDB');

db.version(5).stores({
  companies: '++id, name, website, industry, notes, benefits',
  positions: '++id, title, department, level, skills',
  applications:
    '++id, companyId, positionId, status, dateApplied, lastUpdated, salary, salaryType, jobUrl, jobDescription, workType, location, skills',
  applicationDetails: '++id, applicationId, type, date, notes, additionalData',
});

// Companies CRUD
export const getAllCompanies = async () => db.companies.toArray();
export const getCompanyById = async (id) => db.companies.get(id);
export const addCompany = async (company) => db.companies.add(company);
export const updateCompany = async (id, updated) => db.companies.update(id, updated);
export const deleteCompany = async (id) => db.companies.delete(id);

// Check if company is used in any applications
export const getApplicationsByCompanyId = async (companyId) => {
  return await db.applications.where('companyId').equals(parseInt(companyId)).toArray();
};

// Positions CRUD
export const getAllPositions = async () => db.positions.toArray();
export const getPositionById = async (id) => db.positions.get(id);
export const addPosition = async (position) => db.positions.add(position);
export const updatePosition = async (id, updated) => db.positions.update(id, updated);
export const deletePosition = async (id) => db.positions.delete(id);

// Check if position is used in any applications
export const getApplicationsByPositionId = async (positionId) => {
  return await db.applications.where('positionId').equals(parseInt(positionId)).toArray();
};

// Applications CRUD with auto-creation of initial detail
export const getAllApplications = async () => {
  const applications = await db.applications.toArray();
  // Enrich with company and position data
  const enrichedApps = await Promise.all(
    applications.map(async (app) => {
      const company = await getCompanyById(parseInt(app.companyId));
      const position = await getPositionById(parseInt(app.positionId));
      return {
        ...app,
        company: company?.name || app.company || 'Unknown',
        position: position?.title || app.position || 'Unknown',
      };
    })
  );
  return enrichedApps;
};

export const getApplicationById = async (id) => {
  const app = await db.applications.get(id);
  if (app) {
    let companyData = null;
    let positionData = null;

    if (app.companyId) {
      companyData = await getCompanyById(parseInt(app.companyId));
    }

    if (app.positionId) {
      positionData = await getPositionById(parseInt(app.positionId));
    }

    return {
      ...app,
      companyData,
      positionData,
    };
  }
  return null;
};

export const addApplication = async (appData) => {
  const appId = await db.applications.add(appData);

  await db.applicationDetails.add({
    applicationId: appId,
    type: 'application',
    date: appData.dateApplied || new Date().toISOString().split('T')[0],
    notes: 'Initial application submitted',
    additionalData: JSON.stringify({
      source: appData.source || '',
      jobUrl: appData.jobUrl || '',
    }),
  });

  return appId;
};

export const updateApplication = async (id, updated) => db.applications.update(id, updated);

export const deleteApplication = async (id) => {
  await db.applicationDetails.where('applicationId').equals(id).delete();
  await db.applications.delete(id);
};

export const getDetailsByApplication = async (appId) => {
  const details = await db.applicationDetails.where('applicationId').equals(appId).toArray();
  return details.map((detail) => ({
    ...detail,
    additionalData: detail.additionalData ? JSON.parse(detail.additionalData) : {},
  }));
};

export const addDetail = async (detail) => {
  const detailWithStringifiedData = {
    ...detail,
    additionalData: JSON.stringify(detail.additionalData || {}),
  };
  return db.applicationDetails.add(detailWithStringifiedData);
};

export const updateDetail = async (id, updatedDetail) => {
  const detailWithStringifiedData = {
    ...updatedDetail,
    additionalData: JSON.stringify(updatedDetail.additionalData || {}),
  };
  return db.applicationDetails.update(id, detailWithStringifiedData);
};

export const deleteDetail = async (id) => db.applicationDetails.delete(id);
