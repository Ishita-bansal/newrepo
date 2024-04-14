import React from "react";
import { MenuItem, TextField, Select, Button } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useFormik } from "formik";
import * as yup from "yup";
import "./formstyle.css";
const initialValues = {
  name: "",
  phone: "",
  countries: "",
  states: "",
  cities: "",
};

const phoneRegex = /^\+?[0-9\s-]{7,15}$/ ;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "name must be atleast of 20 characters")
    .required("Required*"),
  phone: yup
    .string()
    .matches(phoneRegex, "Invalid Format")
    .required("Required*"),
    countries:yup.string().required("Requird*"),
    states:yup.string().required("Requird*"),
    cities:yup.string().required("Requird*"),
});

const countries = [
  {
    name: "india",
    states: [
      {
        name: "punjab",
        cities: ["ludhiana", "patiala", "Ropar"],
      },
      {
        name: "haryana",
        cities: ["kaithal", "Sonipat", "Rohtak"],
      },
      {
        name: "Himachal Pardesh",
        cities: ["Mandi", "Solan", "Una"],
      },
    ],
  },
  {
    name: "virginia",
    states: [
      {
        name: "state1",
        cities: ["city1", "city2", "city3"],
      },
      {
        name: "state2",
        cities: ["city4", "city5", "city6"],
      },
      {
        name: "state3",
        cities: ["city7", "city8", "city9"],
      },
    ],
  },
  {
    name: "usa",
    states: [
      {
        name: "state4",
        cities: ["city10", "city11", "city12"],
      },
      {
        name: "state5",
        cities: ["city13", "city14", "city15"],
      },
      {
        name: "state6",
        cities: ["city16", "city17", "city18"],
      },
    ],
  },
];

const Forms = () => {
  const handlecountries = (e) => {
    setFieldValue("countries", e.target.value);
    setFieldValue("states", "");
    setFieldValue("cities", "");
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });
  const { values, setFieldValue, handleSubmit,setTouched ,touched,errors} = formik;

  function handleOnChange(value) {
    setFieldValue("phone", value);
  }
  return (
    <div className="main">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="select-countries">
            <div className="ui-inputs">
              <TextField
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onBlur={()=>setTouched({...touched,name:true})}
                placeholder="Name"
                sx={{ width: "100%" }}
              />
            </div>
            {
              touched.name && errors.name ? <p style={{color:"red",fontStyle:"italic"}}>{errors.name}</p> : <p style={{visibility:"hidden"}}>text</p>
            }
            <div className="ui-inputs">
              <MuiPhoneNumber
                name="phone"
                value={values.phone}
                onChange={handleOnChange}
                onBlur={()=>setTouched({...touched,phone:true})}
                defaultCountry={"us"}
                sx={{ width: "100%" }}
              />
            </div>
            {
              touched.phone && errors.phone ? <p style={{color:"red",fontStyle:"italic"}}>{errors.phone}</p> : <p style={{visibility:"hidden"}}>text</p>
            }
            <div className="ui-inputs">
              <Select
                value={values.countries}
                onChange={handlecountries}
                onBlur={()=>setTouched({...touched,countries:true})}
                sx={{ width: "100%" }}
              >
                <MenuItem>Countries</MenuItem>
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {
              touched.countries && errors.countries ? <p style={{color:"red",fontStyle:"italic"}}>{errors.countries}</p> : <p style={{visibility:"hidden"}}>text</p>
            }
            <div className="ui-inputs">
              <Select
                value={values.states}
                onChange={(e) => {
                  setFieldValue("states", e.target.value);
                  setFieldValue("cities", "");
                }}
                onBlur={()=>setTouched({...touched,states:true})}
                sx={{ width: "100%" }}
              >
                <MenuItem>States</MenuItem>
                {countries
                  .find((ctr) => ctr.name === values.countries)
                  ?.states.map((state, index) => (
                    <MenuItem key={index} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            {
              touched.states && errors.states ? <p style={{color:"red",fontStyle:"italic"}}>{errors.states}</p> : <p style={{visibility:"hidden"}}>text</p>
            }
            <div className="ui-inputs">
              <Select
                value={values.cities}
                onChange={(e) => {
                  setFieldValue("cities", e.target.value);
                }}
                onBlur={()=>setTouched({...touched,cities:true})}
                sx={{ width: "100%" }}
              >
                <MenuItem>Cities</MenuItem>
                {values.states &&
                  countries
                    .find((ctr) => ctr.name === values.countries)
                    .states.find((state) => state.name === values.states)
                    .cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
              </Select>
            </div>
            {
              touched.cities && errors.cities ? <p style={{color:"red",fontStyle:"italic"}}>{errors.cities}</p> : <p style={{visibility:"hidden"}}>text</p>
            }
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button sx={{ margin: "10px" }} variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forms;
