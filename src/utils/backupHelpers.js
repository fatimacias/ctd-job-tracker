import { db } from '@db/indexedDbClient';

/**
 * Export all data from IndexedDB to a JSON file
 */
export async function exportDatabase() {
  try {
    // Get all data from all tables
    const [applications, companies, positions, applicationDetails] = await Promise.all([
      db.applications.toArray(),
      db.companies.toArray(),
      db.positions.toArray(),
      db.applicationDetails.toArray(),
    ]);

    // Create backup object
    const backup = {
      version: db.verno,
      exportDate: new Date().toISOString(),
      data: {
        applications,
        companies,
        positions,
        applicationDetails,
      },
      stats: {
        applications: applications.length,
        companies: companies.length,
        positions: positions.length,
        applicationDetails: applicationDetails.length,
      },
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(backup, null, 2);

    // Create blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return backup.stats;
  } catch (error) {
    console.error('Error exporting database:', error);
    throw error;
  }
}

/**
 * Import data from a backup JSON file
 * @param {File} file - The JSON file to import
 * @param {boolean} merge - If true, merge with existing data. If false, replace all data.
 */
export async function importDatabase(file, merge = false) {
  try {
    // Read file
    const text = await file.text();
    const backup = JSON.parse(text);

    // Validate backup structure
    if (!backup.data || !backup.version) {
      throw new Error('Invalid backup file format');
    }

    // If not merging, clear existing data
    if (!merge) {
      await db.transaction(
        'rw',
        db.applications,
        db.companies,
        db.positions,
        db.applicationDetails,
        async () => {
          await db.applications.clear();
          await db.companies.clear();
          await db.positions.clear();
          await db.applicationDetails.clear();
        }
      );
    }

    const stats = {
      companies: 0,
      positions: 0,
      applications: 0,
      applicationDetails: 0,
    };

    // Import data in order (companies and positions first, then applications, then details)

    // 1. Import companies
    if (backup.data.companies && backup.data.companies.length > 0) {
      for (const company of backup.data.companies) {
        if (merge) {
          // Check if company already exists by name
          const existing = await db.companies.where('name').equals(company.name).first();
          if (!existing) {
            await db.companies.add(company);
            stats.companies++;
          }
        } else {
          await db.companies.add(company);
          stats.companies++;
        }
      }
    }

    // 2. Import positions
    if (backup.data.positions && backup.data.positions.length > 0) {
      for (const position of backup.data.positions) {
        if (merge) {
          // Check if position already exists by title
          const existing = await db.positions.where('title').equals(position.title).first();
          if (!existing) {
            await db.positions.add(position);
            stats.positions++;
          }
        } else {
          await db.positions.add(position);
          stats.positions++;
        }
      }
    }

    // 3. Import applications
    if (backup.data.applications && backup.data.applications.length > 0) {
      for (const application of backup.data.applications) {
        if (merge) {
          // For applications, always import (no duplicate check)
          await db.applications.add(application);
          stats.applications++;
        } else {
          await db.applications.add(application);
          stats.applications++;
        }
      }
    }

    // 4. Import application details
    if (backup.data.applicationDetails && backup.data.applicationDetails.length > 0) {
      for (const detail of backup.data.applicationDetails) {
        if (merge) {
          await db.applicationDetails.add(detail);
          stats.applicationDetails++;
        } else {
          await db.applicationDetails.add(detail);
          stats.applicationDetails++;
        }
      }
    }

    return {
      success: true,
      stats,
      backupDate: backup.exportDate,
    };
  } catch (error) {
    console.error('Error importing database:', error);
    throw error;
  }
}

/**
 * Clear all data from the database
 */
export async function clearAllData() {
  try {
    await db.transaction(
      'rw',
      db.applications,
      db.companies,
      db.positions,
      db.applicationDetails,
      async () => {
        await db.applications.clear();
        await db.companies.clear();
        await db.positions.clear();
        await db.applicationDetails.clear();
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
}
