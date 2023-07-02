import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CarContext = createContext();

export function useCarContext() {
  return useContext(CarContext);
}

export function CarProvider({ children }) {
  const [cars, setCars] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [addedCar, setAddedCar] = useState({});
  const [editedCar, setEditedCar] = useState({});
  const [deletedCar, setDeletedCar] = useState({});

  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const [errors, setErrors] = useState([]);

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

    validateCar(event);
  };

  const handleCarAdd = (event) => {
    const { name, value } = event.target;

    setAddedCar((newCar) => ({
      ...newCar,
      [name]: value,
    }));

    validateCar(event);
  };

  const validateCar = (event) => {
    const { name, value } = event.target;
    const year = new Date().getFullYear();

    setErrors(errors.filter(error => error.field !== name));

    if (name === "car_vin" && cars.some(car => car.car_vin === value)) {
      setErrors([...errors, { field: name, message: "VIN must be unique" }]);
    }

    if ((name === "car" || 
         name === "car_model" || 
         name === "car_vin" || 
         name === "car_color") && value.length < 3) {
      setErrors([...errors, { field: name, message: "The field length must have at lest 3 symbols" }]);
    }

    if (name === "car_model_year" && (parseInt(value) < 1900 || parseInt(value) >= year)) {
      setErrors([...errors, { field: name, message: `Model year must be less than ${year} but bigger than 1900` }]);
    }

    if (name === "price" && value <= 0) {
      setErrors([...errors, { field: name, message: "Price musn't be negative or 0" }]);
    }
  };

  const handleAddCarSubmit = (event) => {
    event.preventDefault();

    if (errors.length !== 0) {
      return;
    }

    setCars([addedCar, ...cars]);
    localStorage.setItem('cars', JSON.stringify([addedCar, ...cars]));

    setMessageText(`Car ${addedCar.car} ${addedCar.car_model} added`);
    setMessageOpen(true);

    handleAddModalClose();
  };

  const handleEditCarSubmit = (event) => {
    event.preventDefault();

    const car = cars.findIndex(car => car.id === editedCar.id);
    cars[car] = editedCar;
    localStorage.setItem('cars', JSON.stringify(cars));

    setMessageText(`Car ${editedCar.car} ${editedCar.car_model} updated`);
    setMessageOpen(true);

    handleEditModalClose();
  };

  const handleDeleteCarSubmit = (event, deletedCar) => {
    event.preventDefault();

    let newCars = cars.filter(car => car.id !== deletedCar.id);
    setCars(newCars);
    localStorage.setItem('cars', JSON.stringify(newCars));

    setMessageText(`Car ${deletedCar.car} ${deletedCar.car_model} deleted`);
    setMessageOpen(true);

    handleDeleteModalClose();
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

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleMessageClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const carContextValue = {
    cars,
    setCars,
    search,
    errors,

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
    handleDeleteCarSubmit,
    deleteModalOpen,
    deletedCar,

    handleAddModalOpen,
    handleAddModalClose,
    handleAddCarSubmit,
    handleCarAdd,
    addModalOpen,
  };

  return (
    <CarContext.Provider value={carContextValue}>
      {children}

      <Snackbar
        open={messageOpen}
        autoHideDuration={3000}
        onClose={handleMessageClose}
        message={messageText}
        action={action}
      />
    </CarContext.Provider>
  );
}
