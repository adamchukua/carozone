import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";

const CarContext = createContext();

export function useCarContext() {
  return useContext(CarContext);
}

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [editedCar, setEditedCar] = useState({});
  const [deletedCar, setDeletedCar] = useState({});

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  useEffect(() => {
    axios.get("https://myfakeapi.com/api/cars/")
      .then(response => {
        setCars(response.data.cars);
      })
      .catch(error => {
        console.error("Error fetching cars: ", error);
      });
  }, []);

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
    setDeletedCar,
    cars,
    setCars
  };

  return (
    <CarContext.Provider value={carContextValue}>
      {children}
    </CarContext.Provider>
  );
}
