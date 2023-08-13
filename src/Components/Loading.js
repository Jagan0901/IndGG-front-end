import { LoadingButton } from "@mui/lab";

export function Loading() {
  const loadingStyles = {
    textAlign: "center",
    margin: "20%",
  };
  const styles = {
    marginTop: "1px",
  };
  return (
    <div style={loadingStyles}>
      <LoadingButton size="large" loading variant="contained">
        Loading
      </LoadingButton>
      <h4 style={styles}>Loading...</h4>
    </div>
  );
}
