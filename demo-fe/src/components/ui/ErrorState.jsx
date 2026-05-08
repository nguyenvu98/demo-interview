export default function ErrorState({ message = 'Something went wrong.' }) {
  return <div className="status error">{message}</div>;
}
