"use client";

import React, { useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";
// import { MenuItem, Select } from "@mui/material";

type countryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string | null | undefined;
    longitude: string | null | undefined;
    countryCode: string | null | undefined;
    name: string | null | undefined;
    stateCode: string | null | undefined;
  };
  label: string | null | undefined;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);

  const router = useRouter();

  const handleSelectedCountry = (option: countryOption) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };
  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value?.name}/${option?.value?.latitude}/${option?.value?.longitude}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />

          <label htmlFor="country">Country</label>
        </div>

        <Select
          className="text-black"
          options={options}
          noOptionsMessage={() => "No country found"}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />
        {/* <Select
          className="text-black"
          size="small"
          multiple={false}
          fullWidth
          value={selectedCountry}
          onChange={(e: any) => {
            const option = e?.target?.value;
            setSelectedCountry(option);
            setSelectedCity(null);
          }}
        >
          {options?.map((option, ind) => (
            <MenuItem key={ind} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select> */}
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />

            <label htmlFor="country">City</label>
          </div>

          <Select
            className="text-black"
            options={
              City.getCitiesOfCountry(selectedCountry?.value?.isoCode)?.map(
                (state) => ({
                  value: {
                    latitude: state.latitude,
                    longitude: state.longitude,
                    countryCode: state.countryCode,
                    name: state.name,
                    stateCode: state.stateCode,
                  },
                  label: state.name,
                })
              ) || []
            }
            noOptionsMessage={() => "No city found"}
            value={selectedCity}
            onChange={handleSelectedCity}
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;
