import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import { getAllPatients, createPatient, updatePatient, deletePatient } from './services/patientService';

function App() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, formData);
      } else {
        await createPatient(formData);
      }
      setShowForm(false);
      setEditingPatient(null);
      fetchPatients();
    } catch (err) {
      setError('Failed to save patient. Please try again.');
      console.error(err);
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        fetchPatients();
      } catch (err) {
        setError('Failed to delete patient. Please try again.');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Hospital Management System
          </h1>
          <p className="mt-1 text-sm text-gray-500">Patient Management</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Patients List
          </h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Register Patient
            </button>
          )}
        </div>

        {/* Form or List */}
        <div className="bg-white shadow rounded-lg">
          {showForm ? (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPatient ? 'Edit Patient' : 'Add New Patient'}
              </h3>
              <PatientForm
                patient={editingPatient}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          ) : loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">Loading patients...</p>
            </div>
          ) : (
            <div className="p-6">
              <PatientList
                patients={patients}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2026 Hospital Management System. All rights reserved dont copy this created assumanmugisha773@gmail.com.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
