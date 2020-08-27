import React from "react";
import { useForm } from "react-hook-form";

const Example = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
      />
      {errors.email && errors.email.message}

      <input
        name="usernames"
        ref={register({
          validate: value => value !== "admin" || "Nice try!"
        })}
      />
      {errors.usernames && errors.usernames.message}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Example