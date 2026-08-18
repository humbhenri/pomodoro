import { useTaskContext } from "../../context/TaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    'workTime': 'trabalho',
    'shortBreakTime': 'pausa curta',
    'longBreakTime': 'pausa longa'
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <div
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              key={nextCycle}
              aria-label={`Indicador de ciclo de foco de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de foco de ${cycleDescriptionMap[nextCycleType]}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
