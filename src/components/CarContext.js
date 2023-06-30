import React, { useState } from 'react';
import { createContext, useContext } from 'react';

const CarContext = createContext();

export function useCarContext() {
  return useContext(CarContext);
}

export function CarProvider({ children }) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [editedCar, setEditedCar] = useState({});
  const [deletedCar, setDeletedCar] = useState({});

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleCarChange = (event) => {
    const { name, value } = event.target;
    setEditedCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const carContextValue = {
    editModalOpen,
    handleEditModalOpen,
    handleEditModalClose,
    editedCar,
    handleCarChange,
    handleSubmit,
    deleteModalOpen,
    handleDeleteModalOpen,
    handleDeleteModalClose,
    deletedCar,
    setEditedCar,
    setDeletedCar
  };

  return (
    <CarContext.Provider value={carContextValue}>
      {children}
    </CarContext.Provider>
  );
}
