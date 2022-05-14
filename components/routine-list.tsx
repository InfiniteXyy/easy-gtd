import { todoModule } from '~/store';
import { WeekDaySelect } from './ui';

export function RoutineList() {
  const [{ routines }, { deleteRoutine, updateRoutingConfig, applyRoutineTodos }] =
    todoModule.use();
  if (!routines.length) return null;
  return (
    <>
      <div className="text-xs font-medium text-neutral-300 dark:text-neutral-600">Routines</div>
      <div className="space-y-4">
        {routines.map((routine) => (
          <div key={routine.id} className="rounded-lg bg-neutral-50 py-2 px-3 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <div className="font-bold">{routine.title}</div>
              <div
                onClick={() => deleteRoutine(routine.id)}
                className="i-[ic-baseline-delete] text-red-400"
              />
            </div>
            <div className="mt-2 max-w-[80%] flex-shrink-0">
              <WeekDaySelect
                size="sm"
                value={routine.config}
                onChange={(config) => {
                  updateRoutingConfig(routine.id, config);
                  applyRoutineTodos();
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
