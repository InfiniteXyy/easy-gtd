import { defineModule } from 'zoov';

export const uiModule = defineModule({
  isInEditMode: false,
})
  .actions({
    setInEditMode: (state, isInEditMode: boolean) => (state.isInEditMode = isInEditMode),
  })
  .build();
