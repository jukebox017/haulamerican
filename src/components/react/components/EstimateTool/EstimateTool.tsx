import { get, useForm } from "react-hook-form";
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
    getValues,
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

  const serviceTypesToString = () => {
    let serviceString = serviceTypes.filter((serviceType) => {
      return serviceType.selected;
    }).map((serviceType) => {
      return `${serviceType.title} x ${serviceType.quantity}`
    })
    .join(',');

    return serviceString;
  }

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
            <span>I have a few items to haul</span>
          </button>

          <button
            type="button"
            className={`general-button ${fiveOrLess === 'false' ? 'selected' : ''}`}
            onClick={() => updateFiveOrLess('false')}
          >
            <span>Estimate based on trailer usage</span>
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

          { /*
          <input
            type="submit"
            value="Submit your estimate!"
            onClick={() => console.log('hey')}
          />
          */ }

          <a href={`mailto:garrett@haulamerican.us?subject=New Estimate by Haul American&body=I've created a new estimate at haulamerican.us. Here is the information I've provided: %0D%0A
            Zip: ${getValues('zipCode')} %0D%0A
            First Name: ${getValues('firstName')} %0D%0A
            Last Name: ${getValues('lastName')} %0D%0A
            Email: ${getValues('email')} %0D%0A
            Phone: ${getValues('phone')} %0D%0A
            Services: ${serviceTypesToString()} %0D%0A
            Estimated Total: $${estimate} `}>Submit Your Estimate!
          </a>
        </div>
      )}
    </div>
  )
}
