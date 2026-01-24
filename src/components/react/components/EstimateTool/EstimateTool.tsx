import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface Inputs {
  zipCode: string
  firstName: string
  lastName: string
}

export default function EstimateTool(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <input type="submit" value="Submit" />
    </form>
  )
}
