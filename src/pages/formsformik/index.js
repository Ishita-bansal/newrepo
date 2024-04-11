import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  Checkbox,
  Button,
} from "@mui/material";
import "./styleform.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmpass: "",
  gender: "",
  interests: [],
  birthdate: null,
};

const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Name must be of 20 characters")
    .required("Required*"),
  email: yup
    .string()
    .matches(emailregex, "Invalid email format")
    .required("Required*"),
  password: yup
    .string()
    .max(4, "Password must be atleast of 4 characters")
    .required("Required*"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required("Required*"),
  gender: yup.string().required("Select any one option"),
  interests:yup.array().min(1,"select atleast one interest").required("Required*"),
  birthdate:yup.date().required("Required*")
});

const Formsformik = () => {
  const objfield = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      component: "input",
    },

    {
      name: "email",
      type: "email",
      placeholder: "Email",
      component: "input",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      component: "input",
    },
    {
      name: "confirmpass",
      type: "password",
      placeholder: "Confirm Password",
      component: "input",
    },
    {
      name: "gender",
      options: ["male", "female", "other"],
      component: "select",
    },
    {
      name: "checked",
      checkoption: ["reading", "sports", "games"],
      type: "checkbox",
      component: "multi-select",
    },
    {
      name: "birthdate",
      type: "date",
      component:"date-pick"
    },
  ];

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleCheckbox = (e, interestoption) => {
    const { checked } = e.target;
    const updatedInterests = checked
      ? [...values.interests, interestoption]
      : values.interests.filter((interest) => interest !== interestoption);
  
    setFieldValue("interests", updatedInterests);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { values, setFieldValue, touched, errors, setTouched } = formik;

  console.log("values==>", values);
  return (
    <div className="main-form-container">
      <form>
        <div className="forms-input-fields">
          {
          objfield?.map((user, i) => {
            return (
              <>
                {user.component === "input" && (
                  <div className="muifields" key={`${user?.name}-${i}`}>
                    <TextField
                      type={user?.type}
                      name={user?.name}
                      value={values?.[user?.name]}
                      onChange={(e) =>
                        setFieldValue(user?.name, e.target.value)
                      }
                      onBlur={() =>
                        setTouched({ ...touched, [user?.name]: true })
                      }
                      placeholder={user.placeholder}
                      sx={{ width: "350px" }}
                    />
                    {touched?.[user?.name] && errors?.[user?.name] ? (
                      <p>{errors?.[user?.name]}</p>
                    ) : (
                      <p style={{ visibility: "hidden" }}>text</p>
                    )}
                  </div>
                )}
                {user.component === "select" && (
                  <div className="muifields">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name={user.name}
                      value={values?.[user.name]}
                      onChange={(e) =>
                        setFieldValue(user.name, e.target.value)
                      }
                      onBlur={(e) =>
                        setTouched({ ...touched, [user?.name]: true })
                      }
                      style={{ width: "350px" }}
                    >
                      {user?.options?.map((users) => (
                        <MenuItem value={users}>{users}</MenuItem>
                      ))}
                    </Select>
                    {touched?.[user?.name] && errors?.[user?.name] ? (
                      <p>{errors?.[user?.name]}</p>
                    ) : (
                      <p style={{ visibility: "hidden" }}>text</p>
                    )}
                  </div>
                )}
                {user.component === "multi-select" && (
                  <div className="muifields">
                    <InputLabel>Interests</InputLabel>
                    {user?.checkoption?.map((interestoption) => (
                      <label key={interestoption}>
                        <Checkbox
                          name={interestoption}
                          type={user?.type}
                          onChange={(e)=>handleCheckbox(e, interestoption)}
                          onBlur={() =>
                            setTouched({ ...touched, [user.name]: true })
                          }
                          checked={values.interests.includes(interestoption)}
                        />
                        {interestoption}
                      </label>
                    ))}
                    {
                        touched?.[user?.name] && errors?.[user?.name]? user.name === "interests" (
                        <p>{errors?.[user?.name]}</p>
                      ) : (
                        <p style={{ visibility: "hidden" }}>text</p>
                      )
                    }
                  </div>
                )}
          {    
            user.component === "date-pick" &&(
              <div className="muifields">
            <InputLabel>Date of Birth</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                type={user.type}
                name={user?.name}
                value={values?.[user?.name]}
                onChange={(date) => setFieldValue(user.name, date)}
                onBlur={() => setTouched({ ...touched, [user?.name]: true })}
                sx={{ width: "350px" }}
              />
            </LocalizationProvider>
            {touched?.[user?.name] && errors?.[user?.name] ? (
              <p>{errors?.[user?.name]}</p>
            ) : (
              <p style={{ visibility: "hidden" }}>text</p>
            )}
          </div>
            )}
        </>
      );
    })
    }  
          <div className="forms-btn">
            <Button variant="contained">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Formsformik;
