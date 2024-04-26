type FormSuccessProps = {
  message?: string;
}

export const FormSuccess = ({
  message
}: FormSuccessProps) => {
  if (!message) return null

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}