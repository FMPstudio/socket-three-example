import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Object3D } from "three";
import { TestInteractable } from "./interactables";
import {
  ChangeableProperty,
  ChangeableTypes,
  Interactable,
} from "./interactables/Interactable";
import { InteractionStore, InteractionStoreContext } from "./InteractionStore";
import { NumberInput, Slider, Button } from "./ui";
import "./UIMapper.sass";

const SwitchOnType = ({ changeable }: { changeable: ChangeableProperty }) => {
  const label = changeable.label;

  switch (changeable.typeOf) {
    case ChangeableTypes.SLIDER:
      return (
        <Slider
          value={changeable.value as number}
          onChange={(v: number) => changeable.onChange!(v)}
        />
      );

    case ChangeableTypes.NUMBER_INPUT:
      return (
        <NumberInput
          value={changeable.value as number}
          onChange={(v: number) => changeable.onChange!(v)}
        />
      );

    case ChangeableTypes.BUTTON:
      return <Button text={label} onClick={() => changeable.onTrigger!()} />;

    default:
      return <></>;
  }
};

const UIMapper = observer(() => {
  const interactionStore = useContext<InteractionStore>(
    InteractionStoreContext
  );

  return (
    <div className="ui-mapper">
      <Button
        text="Add Interactable"
        onClick={() => interactionStore.addInteractable()}
      />
      {interactionStore.interactables.map((ia: Interactable) => {
        return (
          <div key={ia.uuid} className="interactable">
            <b>Object ID: {ia.uuid}</b>
            {Object.keys(ia.changableProperties).map((key: string) => {
              const changeable = ia.changableProperties[key];
              return (
                <div key={key}>
                  <SwitchOnType changeable={changeable} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export { UIMapper };
