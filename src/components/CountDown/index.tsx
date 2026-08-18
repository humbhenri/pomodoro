import { useTaskContext } from "../../context/TaskContext";
import styles from "./styles.module.css";

export function CountDown() {
  const { state } = useTaskContext();
  return (
    <div className={styles.container}>
      {state.formattedSecondsRemaining}
    </div>
  );
}
