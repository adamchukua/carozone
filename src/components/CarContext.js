import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";

const CarContext = createContext();

export function useCarContext() {
  return useContext(CarContext);
}

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [editedCar, setEditedCar] = useState({});
  const [deletedCar, setDeletedCar] = useState({});

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      fetchCars();
    }
  }, []);

  const fetchCars = () => {
    axios.get("https://myfakeapi.com/api/cars/")
      .then(response => {
        const fetchedCars = response.data.cars;
        setCars(fetchedCars);
        localStorage.setItem('cars', JSON.stringify(fetchedCars));
      })
      .catch(error => {
        console.error("Error fetching cars: ", error);
      });
  };

  const handleCarChange = (event) => {
    const { name, value } = event.target;
    setEditedCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleEditCarSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddCarSubmit = (event) => {
    event.preventDefault();
  };

  const search = (query) => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      const parsedCars = JSON.parse(storedCars);
      setCars(parsedCars.filter(car => 
        car.car.includes(query) ||
        car.car_model.includes(query) ||
        car.car_vin.includes(query)));
    }
  };

  const carContextValue = {
    cars,
    setCars,
    search,

    handleEditModalOpen,
    handleEditModalClose,
    handleCarChange,
    setEditedCar,
    handleEditCarSubmit,
    editModalOpen,
    editedCar,

    handleDeleteModalOpen,
    handleDeleteModalClose,
    setDeletedCar,
    deleteModalOpen,
    deletedCar,

    handleAddModalOpen,
    handleAddModalClose,
    handleAddCarSubmit,
    addModalOpen,
  };

  return (
    <CarContext.Provider value={carContextValue}>
      {children}
    </CarContext.Provider>
  );
}
