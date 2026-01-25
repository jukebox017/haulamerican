import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import './EstimateTool.css';

interface Inputs {
  zipCode: string;
  firstName: string;
  lastName: string;
  fiveOrLess: boolean;
}

export default function EstimateTool(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div id="estimate-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Zip Code</label>
        <input {...register("zipCode")} />

        <label>First Name</label>
        <input {...register("firstName")} />

        <label>Last Name</label>
        <input {...register("lastName")} />

        I have 5 items or less:
        <label>
          <input type="radio" value="yes" {...register("fiveOrLess")} />
          Yes
        </label>

        <label>
          <input type="radio" value="no" {...register("fiveOrLess")} />
          No
        </label>

        <input type="submit" value="Get Your Estimate" />
      </form>

      <div id="estimate">
        <h2>Your Estimate:</h2>
        <h1>$0</h1>
      </div>
    </div>
  )
}
