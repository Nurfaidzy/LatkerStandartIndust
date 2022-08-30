import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
function App() {
  // axios
  const url = "https://dummyjson.com/";

  // const [id, setId] = useState("");
  // const [pas, setPass] = useState("");
  // tidak dibutuhkan karena sudah handle pakai rhf

  const [berhasil, setBerhasil] = useState(false);
  const [outerr, serOuterr] = useState("");

  const login = async (props) => {
    const data = {
      username: props.username,
      password: props.password,
    };
    try {
      await axios.post(url + "auth/login", data).then((res) => {
        res ? setBerhasil(true) : setBerhasil(false);
      });
    } catch (error) {
      axios.interceptors.response.use(undefined, (error) => {
        serOuterr(error.response.data.message);
      });
    }
  };

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();
  const onSubmit = (data) => login(data);
  return (
    <div className="p-5 flex justify-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="id"
            className="border-2 rounded-sm p-2"
            // onChange={(e) => setId(e.target.value)}
            {...register("username", {
              required: true,
              maxLength: 20,
            })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-sm p-2"
            // onChange={(e) => setPass(e.target.value)}
            {...register("password", {
              required: true,
              maxLength: 20,
            })}
          />
          <div className="flex justify-center">
            <input type="submit" className="p-2 bg-orange-400 font-bold" />
          </div>
        </form>
        <div className="flex justify-center">
          {berhasil ? <p>berhasil</p> : <p>{outerr}</p>}
        </div>
        {/* <div className="flex justify-center">{outerr && <p>{outerr}</p>}</div> */}
      </div>
    </div>
  );
}

export default App;
