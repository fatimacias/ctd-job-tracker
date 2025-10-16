import { useToast } from '@hooks/useToast';
import Card from '@shared/Card';
import ToastContainer from '@shared/ToastContainer';
import styles from '@styles/pages/Settings.module.css';
import { clearAllData, exportDatabase, importDatabase } from '@utils/backupHelpers';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleExport = async () => {
    setExporting(true);
    try {
      const stats = await exportDatabase();
      showToast(
        `Backup created! Exported ${stats.applications} applications, ${stats.companies} companies, ${stats.positions} positions.`,
        'success',
        4000
      );
    } catch (error) {
      showToast(`Error creating backup: ${error.message}`, 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (event, merge = false) => {
    const file = event.target.files[0];
    if (!file) return;

    const confirmMessage = merge
      ? 'This will merge the backup data with your existing data. Continue?'
      : 'This will REPLACE all your current data with the backup. Are you sure?';

    if (!confirm(confirmMessage)) {
      event.target.value = '';
      return;
    }

    setImporting(true);
    try {
      const result = await importDatabase(file, merge);
      showToast(
        `Backup restored! Imported ${result.stats.applications} applications. Reloading...`,
        'success',
        2000
      );
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      showToast(`Error importing backup: ${error.message}`, 'error');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const handleClearAll = async () => {
    if (
      !confirm(
        'WARNING: This will DELETE ALL your data permanently. This cannot be undone. Are you absolutely sure?'
      )
    ) {
      return;
    }

    if (!confirm('Last chance! Click OK to DELETE ALL DATA or Cancel to abort.')) {
      return;
    }

    try {
      await clearAllData();
      showToast('All data cleared successfully. Reloading...', 'success', 1000);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      showToast(`Error clearing data: ${error.message}`, 'error');
    }
  };

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <div>
          <Link to="/" className={styles.backLink}>
            ← Back to Dashboard
          </Link>
          <h1>Settings & Backup</h1>
          <p className={styles.subtitle}>Manage your data and create backups</p>
        </div>
      </div>

      <div className={styles.settingsGrid}>
        <Card title="Export Backup" iconClass="icon-database" variant="primary">
          <p className={styles.description}>
            Download all your data as a JSON file. This includes all applications, companies,
            positions, and timeline entries.
          </p>
          <button className="primary" onClick={handleExport} disabled={exporting}>
            {exporting ? (
              'Exporting...'
            ) : (
              <>
                <span className="icon icon-export"></span> Export Data
              </>
            )}
          </button>
        </Card>

        <Card title="Import Backup (Replace)" iconClass="icon-import" variant="warning">
          <p className={styles.description}>
            <strong>
              <span className="icon icon-warning"></span> Warning:
            </strong>{' '}
            This will <strong>REPLACE</strong> all your current data with the backup file.
          </p>
          <label className={styles.fileLabel}>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleImport(e, false)}
              disabled={importing}
              className={styles.fileInput}
            />
            <span className={`${styles.fileButton} ${importing ? styles.disabled : ''}`}>
              {importing ? (
                'Importing...'
              ) : (
                <>
                  <span className="icon icon-folder"></span> Choose File to Replace
                </>
              )}
            </span>
          </label>
        </Card>

        <Card title="Import Backup (Merge)" iconClass="icon-merge" variant="success">
          <p className={styles.description}>
            Merge backup data with your existing data. Duplicate companies/positions will be
            skipped.
          </p>
          <label className={styles.fileLabel}>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleImport(e, true)}
              disabled={importing}
              className={styles.fileInput}
            />
            <span className={`${styles.fileButton} ${importing ? styles.disabled : ''}`}>
              {importing ? (
                'Importing...'
              ) : (
                <>
                  <span className="icon icon-folder"></span> Choose File to Merge
                </>
              )}
            </span>
          </label>
        </Card>

        <Card title="Clear All Data" iconClass="icon-trash" variant="danger">
          <p className={styles.description}>
            <strong>
              <span className="icon icon-warning"></span> Danger Zone:
            </strong>{' '}
            Permanently delete all data from your browser. This cannot be undone. Make sure to
            export a backup first!
          </p>
          <button className={styles.dangerButton} onClick={handleClearAll}>
            <span className="icon icon-trash"></span> Delete All Data
          </button>
        </Card>
      </div>

      <div className={styles.infoSection}>
        <h3>
          <span className="icon icon-info"></span> About Data Storage
        </h3>
        <ul>
          <li>All data is stored locally in your browser using IndexedDB</li>
          <li>No data is sent to any server - everything stays private</li>
          <li>Backups are saved as JSON files on your computer</li>
          <li>You can transfer backups between browsers or devices</li>
          <li>Regular backups are recommended to prevent data loss</li>
        </ul>
      </div>

      <ToastContainer toast={toast} onClose={hideToast} />
    </div>
  );
}
