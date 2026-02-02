import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import './EstimateTool.css';
import { useState } from 'react';

import epczips from './epc-zips';
import tczips from './tellercounty-zips';

const allowedZips: string[] = epczips.concat(tczips);

interface Inputs {
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  communicationConsent: boolean;
}

export default function EstimateTool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Inputs>();

  const [fiveOrLess, setFiveOrLess] = useState('');
  const updateFiveOrLess = (fiveOrLess: string) => {
    setFiveOrLess(fiveOrLess);
    resetEstimate();
  }

  const resetEstimate = () => {
    const updatedServiceTypes = serviceTypes.map((serviceType) => {
      serviceType.selected = false;
      serviceType.quantity = 0;

      return serviceType;
    });

    setServiceTypes(updatedServiceTypes);
    updateEstimate();
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  type serviceType = {
    category: "per-item" | "trailer",
    description?: string;
    id: string;
    price: number;
    quantity: number;
    selected: boolean;
    svgString: string;
    svgUrl: string;
    title: string;
  }

  let initialServiceTypes: serviceType[] = [
    {
      category: "trailer",
      description: "Bathroom renovations, single bedroom cleanouts",
      id: "trailer-quarter",
      price: 299,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48"><path d="M41 9h-1.15a4.9 4.9 0 0 0-1.2-2.71c-.57-.56.09-2-2.27-3.19-2-1-3.43.73-4.17-.48A4.65 4.65 0 0 0 28 0a6.58 6.58 0 0 0-4.57 1.65C22.72.75 21.49 0 19 0a3.31 3.31 0 0 0-3.41 2.4c-.56 1.43-2.13-.24-4 .71-2.38 1.17-1.74 2.63-2.3 3.18A4.9 4.9 0 0 0 8.09 9H7a2 2 0 0 0-2 2v1a3 3 0 0 0 2.06 2.83C9.29 47.23 9 42.26 9 45a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3c0-2.78-.28 2.14 1.94-30.17A3 3 0 0 0 43 12v-1a2 2 0 0 0-2-2zM30.5 3.65A3 3 0 0 0 33.91 5a2.5 2.5 0 0 1 1.58-.08c1.42.71.5 1.57 1.74 2.82A2.66 2.66 0 0 1 37.82 9h-5c-.67-2.65-3.45-3.73-6.12-3.94-1.58-.12-1.85-.38-2.31-1.56A4.71 4.71 0 0 1 28 2a2.7 2.7 0 0 1 2.5 1.65zM10.71 7.71C12 6.46 11 5.6 12.44 4.9a2.17 2.17 0 0 1 1.46 0 3 3 0 0 0 3.55-1.81C17.75 2.34 18 2 19 2c5.4 0 1.62 4.59 7.53 5.05 1.47.12 3.49.64 4.15 2H10.12a2.66 2.66 0 0 1 .59-1.34zM37.07 42H10.93L9.07 15h29.86zM37 45a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-1h26zm4-33a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1h34z"/><path d="M25 38V20a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0zM32 38.06l1-18a1 1 0 0 0-2-.12l-1 18a1 1 0 0 0 2 .12zM18 37.94l-1-18a1 1 0 0 0-2 .12l1 18a1 1 0 0 0 2-.12z"/></svg>',
      svgUrl: '',
      title: "Trash Removal - 1/4 Trailer (3 cu. yds)",
    },
    {
      category: "trailer",
      description: "Multiple room renovations, spring cleaning, yard work debris",
      id: "trailer-half",
      price: 399,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48"><path d="M41 9h-1.15a4.9 4.9 0 0 0-1.2-2.71c-.57-.56.09-2-2.27-3.19-2-1-3.43.73-4.17-.48A4.65 4.65 0 0 0 28 0a6.58 6.58 0 0 0-4.57 1.65C22.72.75 21.49 0 19 0a3.31 3.31 0 0 0-3.41 2.4c-.56 1.43-2.13-.24-4 .71-2.38 1.17-1.74 2.63-2.3 3.18A4.9 4.9 0 0 0 8.09 9H7a2 2 0 0 0-2 2v1a3 3 0 0 0 2.06 2.83C9.29 47.23 9 42.26 9 45a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3c0-2.78-.28 2.14 1.94-30.17A3 3 0 0 0 43 12v-1a2 2 0 0 0-2-2zM30.5 3.65A3 3 0 0 0 33.91 5a2.5 2.5 0 0 1 1.58-.08c1.42.71.5 1.57 1.74 2.82A2.66 2.66 0 0 1 37.82 9h-5c-.67-2.65-3.45-3.73-6.12-3.94-1.58-.12-1.85-.38-2.31-1.56A4.71 4.71 0 0 1 28 2a2.7 2.7 0 0 1 2.5 1.65zM10.71 7.71C12 6.46 11 5.6 12.44 4.9a2.17 2.17 0 0 1 1.46 0 3 3 0 0 0 3.55-1.81C17.75 2.34 18 2 19 2c5.4 0 1.62 4.59 7.53 5.05 1.47.12 3.49.64 4.15 2H10.12a2.66 2.66 0 0 1 .59-1.34zM37.07 42H10.93L9.07 15h29.86zM37 45a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-1h26zm4-33a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1h34z"/><path d="M25 38V20a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0zM32 38.06l1-18a1 1 0 0 0-2-.12l-1 18a1 1 0 0 0 2 .12zM18 37.94l-1-18a1 1 0 0 0-2 .12l1 18a1 1 0 0 0 2-.12z"/></svg>',
      svgUrl: '',
      title: "Trash Removal - 1/2 Trailer (6 cu. yds)"
    },
    {
      category: "trailer",
      description: "Estate clear out, eviction cleanup, large renovations",
      id: "trailer-three-quarter",
      price: 599,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48"><path d="M41 9h-1.15a4.9 4.9 0 0 0-1.2-2.71c-.57-.56.09-2-2.27-3.19-2-1-3.43.73-4.17-.48A4.65 4.65 0 0 0 28 0a6.58 6.58 0 0 0-4.57 1.65C22.72.75 21.49 0 19 0a3.31 3.31 0 0 0-3.41 2.4c-.56 1.43-2.13-.24-4 .71-2.38 1.17-1.74 2.63-2.3 3.18A4.9 4.9 0 0 0 8.09 9H7a2 2 0 0 0-2 2v1a3 3 0 0 0 2.06 2.83C9.29 47.23 9 42.26 9 45a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3c0-2.78-.28 2.14 1.94-30.17A3 3 0 0 0 43 12v-1a2 2 0 0 0-2-2zM30.5 3.65A3 3 0 0 0 33.91 5a2.5 2.5 0 0 1 1.58-.08c1.42.71.5 1.57 1.74 2.82A2.66 2.66 0 0 1 37.82 9h-5c-.67-2.65-3.45-3.73-6.12-3.94-1.58-.12-1.85-.38-2.31-1.56A4.71 4.71 0 0 1 28 2a2.7 2.7 0 0 1 2.5 1.65zM10.71 7.71C12 6.46 11 5.6 12.44 4.9a2.17 2.17 0 0 1 1.46 0 3 3 0 0 0 3.55-1.81C17.75 2.34 18 2 19 2c5.4 0 1.62 4.59 7.53 5.05 1.47.12 3.49.64 4.15 2H10.12a2.66 2.66 0 0 1 .59-1.34zM37.07 42H10.93L9.07 15h29.86zM37 45a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-1h26zm4-33a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1h34z"/><path d="M25 38V20a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0zM32 38.06l1-18a1 1 0 0 0-2-.12l-1 18a1 1 0 0 0 2 .12zM18 37.94l-1-18a1 1 0 0 0-2 .12l1 18a1 1 0 0 0 2-.12z"/></svg>',
      svgUrl: '',
      title: "Trash Removal - 3/4 Trailer (9 cu. yds)"
    },
    {
      category: "trailer",
      description: "Whole house renovations, large scale yard work, storage unit cleanouts",
      id: "trailer-full",
      price: 699,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48"><path d="M41 9h-1.15a4.9 4.9 0 0 0-1.2-2.71c-.57-.56.09-2-2.27-3.19-2-1-3.43.73-4.17-.48A4.65 4.65 0 0 0 28 0a6.58 6.58 0 0 0-4.57 1.65C22.72.75 21.49 0 19 0a3.31 3.31 0 0 0-3.41 2.4c-.56 1.43-2.13-.24-4 .71-2.38 1.17-1.74 2.63-2.3 3.18A4.9 4.9 0 0 0 8.09 9H7a2 2 0 0 0-2 2v1a3 3 0 0 0 2.06 2.83C9.29 47.23 9 42.26 9 45a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3c0-2.78-.28 2.14 1.94-30.17A3 3 0 0 0 43 12v-1a2 2 0 0 0-2-2zM30.5 3.65A3 3 0 0 0 33.91 5a2.5 2.5 0 0 1 1.58-.08c1.42.71.5 1.57 1.74 2.82A2.66 2.66 0 0 1 37.82 9h-5c-.67-2.65-3.45-3.73-6.12-3.94-1.58-.12-1.85-.38-2.31-1.56A4.71 4.71 0 0 1 28 2a2.7 2.7 0 0 1 2.5 1.65zM10.71 7.71C12 6.46 11 5.6 12.44 4.9a2.17 2.17 0 0 1 1.46 0 3 3 0 0 0 3.55-1.81C17.75 2.34 18 2 19 2c5.4 0 1.62 4.59 7.53 5.05 1.47.12 3.49.64 4.15 2H10.12a2.66 2.66 0 0 1 .59-1.34zM37.07 42H10.93L9.07 15h29.86zM37 45a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-1h26zm4-33a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1h34z"/><path d="M25 38V20a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0zM32 38.06l1-18a1 1 0 0 0-2-.12l-1 18a1 1 0 0 0 2 .12zM18 37.94l-1-18a1 1 0 0 0-2 .12l1 18a1 1 0 0 0 2-.12z"/></svg>',
      svgUrl: '',
      title: "Trash Removal - Full Trailer (12 cu. yds)"
    },
    {
      category: "per-item",
      id: "trash-removal",
      description: "Priced per bag",
      price: 25,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48"><path d="M41 9h-1.15a4.9 4.9 0 0 0-1.2-2.71c-.57-.56.09-2-2.27-3.19-2-1-3.43.73-4.17-.48A4.65 4.65 0 0 0 28 0a6.58 6.58 0 0 0-4.57 1.65C22.72.75 21.49 0 19 0a3.31 3.31 0 0 0-3.41 2.4c-.56 1.43-2.13-.24-4 .71-2.38 1.17-1.74 2.63-2.3 3.18A4.9 4.9 0 0 0 8.09 9H7a2 2 0 0 0-2 2v1a3 3 0 0 0 2.06 2.83C9.29 47.23 9 42.26 9 45a3 3 0 0 0 3 3h24a3 3 0 0 0 3-3c0-2.78-.28 2.14 1.94-30.17A3 3 0 0 0 43 12v-1a2 2 0 0 0-2-2zM30.5 3.65A3 3 0 0 0 33.91 5a2.5 2.5 0 0 1 1.58-.08c1.42.71.5 1.57 1.74 2.82A2.66 2.66 0 0 1 37.82 9h-5c-.67-2.65-3.45-3.73-6.12-3.94-1.58-.12-1.85-.38-2.31-1.56A4.71 4.71 0 0 1 28 2a2.7 2.7 0 0 1 2.5 1.65zM10.71 7.71C12 6.46 11 5.6 12.44 4.9a2.17 2.17 0 0 1 1.46 0 3 3 0 0 0 3.55-1.81C17.75 2.34 18 2 19 2c5.4 0 1.62 4.59 7.53 5.05 1.47.12 3.49.64 4.15 2H10.12a2.66 2.66 0 0 1 .59-1.34zM37.07 42H10.93L9.07 15h29.86zM37 45a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-1h26zm4-33a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1h34z"/><path d="M25 38V20a1 1 0 0 0-2 0v18a1 1 0 0 0 2 0zM32 38.06l1-18a1 1 0 0 0-2-.12l-1 18a1 1 0 0 0 2 .12zM18 37.94l-1-18a1 1 0 0 0-2 .12l1 18a1 1 0 0 0 2-.12z"/></svg>',
      svgUrl: '',
      title: "Trash Removal"
    },
    {
      category: "per-item",
      id: "mattress",
      price: 75,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="95" height="80" viewBox="0 0 128 128"><path d="M117.833 63.913h-8.745a1.749 1.749 0 0 0-1.75 1.75v10.573a11.282 11.282 0 0 0-7.83-3.161h-48.96a5.586 5.586 0 0 0 .419-2.121v-1.42a5.627 5.627 0 0 0-5.621-5.621H28.338a5.627 5.627 0 0 0-5.621 5.621v1.42a5.579 5.579 0 0 0 .836 2.935 11.35 11.35 0 0 0-3.636 2.346V51.75a1.749 1.749 0 0 0-1.75-1.75h-8a1.749 1.749 0 0 0-1.75 1.75v54.491a1.75 1.75 0 0 0 1.75 1.75h8a1.75 1.75 0 0 0 1.75-1.75v-8.465h87.421v8.465a1.75 1.75 0 0 0 1.75 1.75h8.745a1.75 1.75 0 0 0 1.75-1.75V65.663a1.749 1.749 0 0 0-1.75-1.75zm-91.616 5.621a2.123 2.123 0 0 1 2.121-2.121h17.008a2.123 2.123 0 0 1 2.121 2.121v1.42a2.123 2.123 0 0 1-2.121 2.121H28.338a2.123 2.123 0 0 1-2.121-2.121zm1.529 7.041h71.762a7.839 7.839 0 0 1 7.83 7.83v1.8H19.917v-1.8a7.838 7.838 0 0 1 7.829-7.83zm-11.329 27.916h-4.5V53.5h4.5v50.991zm3.5-10.215v-4.57h87.421v4.57zm96.166 10.215h-5.245V67.413h5.245z"/></svg>',
      svgUrl: '',
      title: "Mattress"
    },
    {
      category: "per-item",
      description: "Examples include toasters, microwaves, etc.",
      id: "small-appliance",
      price: 25,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" viewBox="0 0 64 64"><path d="M59.767 6.07H4.233A3.237 3.237 0 0 0 1 9.304v40.895c0 1.431.942 2.635 2.233 3.059v2.593c0 1.146.934 2.079 2.082 2.079H16.29a2.083 2.083 0 0 0 2.082-2.079v-2.419H45.63v2.419c0 1.146.932 2.079 2.079 2.079h10.978a2.081 2.081 0 0 0 2.078-2.079v-2.593C62.06 52.834 63 51.63 63 50.198V9.305a3.237 3.237 0 0 0-3.233-3.234zM16.373 55.851c0 .041-.04.079-.082.079H5.315c-.043 0-.082-.038-.082-.079v-2.419h11.14v2.42zm42.394 0a.08.08 0 0 1-.079.079H47.71a.08.08 0 0 1-.08-.079v-2.419h11.137v2.42zM61 50.2c0 .68-.554 1.233-1.233 1.233H4.233C3.553 51.432 3 50.88 3 50.2V9.304c0-.68.553-1.234 1.233-1.234h55.534c.68 0 1.233.553 1.233 1.234v40.895z"/><path d="M46.105 12.67H7.75a1 1 0 0 0-1 1v32.18a1 1 0 0 0 1 1h38.356a1 1 0 0 0 1-1V13.67a1 1 0 0 0-1-1zm-1 2v14.092H8.75V14.67h36.356zM8.75 44.85V30.762h36.356V44.85H8.75zM51.39 18.044h4.789a1 1 0 1 0 0-2H51.39a1 1 0 1 0 0 2zM51.39 24.798h4.789a1 1 0 1 0 0-2H51.39a1 1 0 1 0 0 2zM53.925 36.592c-2.202 0-3.993 1.791-3.993 3.994s1.79 3.993 3.993 3.993 3.994-1.791 3.994-3.994-1.792-3.993-3.994-3.993zm0 5.987c-1.099 0-1.993-.894-1.993-1.994s.894-1.993 1.993-1.993c1.1 0 1.994.894 1.994 1.993s-.895 1.994-1.994 1.994zM51.39 31.81h4.789a1 1 0 1 0 0-2H51.39a1 1 0 1 0 0 2z"/></svg>',
      svgUrl: '',
      title: "Small Appliance",
    },
    {
      category: "per-item",
      description: "Examples include ovens, dishwashers, etc.",
      id: "medium-appliance",
      price: 50,
      quantity: 0,
      selected: false,
      svgString: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="45" viewBox="0 0 64 64"><g id="XMLID_574_"><path id="XMLID_579_" d="M31.94 21C22.05 21 14 29.05 14 38.94s8.05 17.94 17.94 17.94 17.94-8.05 17.94-17.94C49.87 29.05 41.83 21 31.94 21zm0 31.87C24.25 52.87 18 46.62 18 38.94S24.25 25 31.94 25s13.94 6.25 13.94 13.94-6.26 13.93-13.94 13.93z"/><path id="XMLID_575_" d="M6 0v64h52V0H6zm48 4v10H10V4h44zM10 60V18h44v42H10z"/></g></svg>',
      svgUrl: '',
      title: "Medium Appliance",
    },
    {
      category: "per-item",
      description: "Examples include refridgerators",
      id: "large-appliance",
      price: 115,
      quantity: 0,
      selected: false,
      svgString: '<svg xmlns="http://www.w3.org/2000/svg" width="45" viewBox="0 0 25 25"><g id="kitchen_2" data-name="kitchen 2"><path d="M23.5 23H23V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V13H8.83a1.63 1.63 0 0 0 .17-.73V11h.5a.5.5 0 0 0 0-1H8.31L9 8.72a.5.5 0 0 0-.9-.44L7.19 10H3.5a.5.5 0 0 0 0 1H4v1.27a1.63 1.63 0 0 0 .17.73H2.5a.5.5 0 0 0-.5.5V23h-.5a.5.5 0 0 0 0 1h22a.5.5 0 0 0 0-1zM22 5v6h-8V5zM5 12.27V11h3v1.27a.73.73 0 0 1-.73.73H5.73a.73.73 0 0 1-.73-.73zM3 14h10v9H3zm11 9V12h8v11z"/><path class="cls-1" d="M15.5 13a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5zM15.5 16a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5zM15.5 9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-1 0v1a.5.5 0 0 0 .5.5zM11.5 17h-7a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5zm-.5 4H5v-3h6zM4.52 16a.5.5 0 0 0 0-1 .5.5 0 0 0-.5.5.5.5 0 0 0 .5.5zM6.52 16a.5.5 0 0 0 0-1 .5.5 0 0 0-.5.5.5.5 0 0 0 .5.5zM8.52 16a.5.5 0 0 0 0-1 .5.5 0 0 0-.5.5.5.5 0 0 0 .5.5z"/></g></svg>',
      svgUrl: '',
      title: "Large Appliance",
    }
  ];

  // Convert SVGs to URL to use in map
  initialServiceTypes = initialServiceTypes.map(serviceType => {
    // From https://stackoverflow.com/a/71546193
    const svgToUrl = URL.createObjectURL(
      new Blob([serviceType.svgString], { type: "image/svg+xml" })
    );

    serviceType['svgUrl'] = svgToUrl;
    return serviceType;
  });

  const [serviceTypes, setServiceTypes] = useState(initialServiceTypes);

  const selectServiceType = (id: string) => {
    const updatedServiceTypes = serviceTypes.map((serviceType) => {
      if (serviceType.id === id) {
        if (!serviceType.selected) {
          serviceType.selected = true;
          serviceType.quantity = 1;

          updateEstimate();
        }

        if (serviceType.selected && serviceType.quantity === 0) {
          serviceType.selected = false;
        }
      }

      return serviceType;
    });

    setServiceTypes(updatedServiceTypes);
  }

  const adjustQuantity = (id: string, newQuantity: number) => {
    const updatedServiceTypes = serviceTypes.map((serviceType) => {
      if (serviceType.id === id) {
        if (newQuantity > 5) newQuantity = 5;
        serviceType.quantity = newQuantity;
      }

      return serviceType;
    });

    setServiceTypes(updatedServiceTypes);

    updateEstimate();
  }

  const updateEstimate = () => {
    let newEstimate = 0;

    serviceTypes
    .filter((serviceType) => {
      if (fiveOrLess === 'true') {
        return serviceType.category === 'per-item';
      }

      if (fiveOrLess === 'false') {
        return serviceType.category === 'trailer';
      }
    })
    .forEach((serviceType) => {
      newEstimate += (serviceType.price * serviceType.quantity);
    });

    setEstimate(newEstimate);
  }

  const [estimate, setEstimate] = useState(0);

  return (
    <div id="estimate-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Zip Code</label>

        <div>{ errors.firstName?.message }</div>

        <input
          type="text"
          {...register("zipCode", {
          required: "THIS IS REQUIRED",
          /*
          validate: {
            checkIfZipAllowed: (zip, { zipCode }) => {
              console.log(zip);
              console.log(zipCode);
              if (!allowedZips.includes(zip)) {
                return "Unfortunately, we do not service this zip code."
              }
            }
          }
            */
        })} />

        <label>First Name</label>
        <input {...register("firstName", { required: 'true' })} />

        <label>Last Name</label>
        <input {...register("lastName")} />

        <label>Email</label>
        <input {...register("email")} />

        <label>Phone</label>
        <input {...register("phone")} />

        <div className="fiveOrLess">
          <button
            type="button"
            className={`general-button ${fiveOrLess === 'true' ? 'selected' : ''}`}
            onClick={() => updateFiveOrLess('true')}
          >
            <span>I have 5 items or less</span>
          </button>

          <button
            type="button"
            className={`general-button ${fiveOrLess === 'false' ? 'selected' : ''}`}
            onClick={() => updateFiveOrLess('false')}
          >
            <span>I have more than 5 items</span>
          </button>
        </div>

        {fiveOrLess != '' && (
          <>
            <h2 className="service-types-instructions">Select from the following options</h2>
            <div className="service-types">

            {
            serviceTypes
            .filter((serviceType) => {
              if (fiveOrLess === 'true') {
                return serviceType.category === 'per-item';
              }

              if (fiveOrLess === 'false') {
                return serviceType.category === 'trailer';
              }
            })
            .map((serviceType) => (
              <div className="service-type" key={serviceType.id}>
                <button
                  type="button"
                  className={`general-button ${serviceType.selected ? 'selected' : ''}`}
                  onClick={() => selectServiceType(serviceType.id) }
                >
                  { !serviceType.selected && ( <img src={serviceType.svgUrl} /> )}
                  <div className="title">{ serviceType.title }</div>
                  { !serviceType.selected && ( <p className="description">{serviceType.description}</p>)}

                  { serviceType.selected && (
                    <div className="quantity-controls">
                      <div className="control" onClick={() => adjustQuantity(serviceType.id, --serviceType.quantity)}>-</div>
                      <div>{ serviceType.quantity } </div>
                      <div className="control" onClick={() => adjustQuantity(serviceType.id, ++serviceType.quantity)}>+</div>
                    </div>
                  )}
                </button>
              </div>
              ))
            }
          </div>

          <div className="contact-consent">
            <input type="checkbox" {...register("communicationConsent")} />
            <label>I consent to being contacted for service by Haul American.</label>
          </div>
        </>
        )}
      </form>

      { fiveOrLess != '' && (
        <div id="estimate">
          <h2>Your Estimate:</h2>
          <h1>${estimate}</h1>
          <input type="submit" value="Lock in your estimate!" />
        </div>
      )}
    </div>
  )
}
