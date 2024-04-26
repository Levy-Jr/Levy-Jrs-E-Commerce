type FormErrorProps = {
  message?: string;
}

export const FormError = ({
  message
}: FormErrorProps) => {
  if (!message) return null

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}