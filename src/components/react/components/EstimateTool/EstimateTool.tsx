import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import './EstimateTool.css';
import { useState } from 'react';

import importedServiceTypes from './serviceTypes';
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

  const zipCodeWatch = watch("zipCode");
  console.log(zipCodeWatch);

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

  // Convert SVGs to URL to use in map
  const initialServiceTypes = importedServiceTypes.map(serviceType => {
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
        if (serviceType?.max && serviceType.quantity > serviceType.max) newQuantity = serviceType.max;
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
        <input
          type="text"
          {...register("zipCode", { required: true })} />

        { zipCodeWatch && zipCodeWatch.length >= 5 && !allowedZips.includes(zipCodeWatch) && (
          <h3 style={{ color: "red" }}>Unfortunately, we are not servicing this zip code at this time.</h3>
        )}

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
                  <img
                    src={serviceType.svgUrl}
                    className={`${serviceType.selected ? 'selected' : ''}`}
                  />
                  <div className="title">{ serviceType.title }</div>
                  { !serviceType.selected && ( <p className="description">{serviceType.description}</p>)}

                  { serviceType.selected && (
                    <div className="quantity-controls">
                      <div className="control" onClick={() => adjustQuantity(serviceType.id, --serviceType.quantity)}>-</div>
                      <div>{ serviceType.quantity } </div>
                      <div
                        className={`control ${(serviceType?.max && serviceType.quantity === serviceType.max) ? 'disabled' : ''}`}
                        onClick={() => adjustQuantity(serviceType.id, ++serviceType.quantity)}
                      >+
                      </div>
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
