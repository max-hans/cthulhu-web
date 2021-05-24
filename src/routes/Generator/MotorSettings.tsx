import {
  Heading,
  HStack,
  VStack,
  Spacer,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import * as React from "react";
import { DCMotor, Stepper } from "./code-generator/types";

import InputField from "./InputField";

interface SettingsProps {
  settings: DCMotor | Stepper;
  index: number;
  onSettingsChange: (data: DCMotor | Stepper) => void;
  onRemove: () => void;
}

const Settings = ({
  settings,
  index,
  onSettingsChange,
  onRemove,
}: SettingsProps) => {
  const handleInputChange = (name: string, data: number | boolean | null) => {
    const key = name.split("-");
    const newMotorSettings = { ...settings };
    if (newMotorSettings[key[0]] !== undefined) {
      if (key.length === 1) {
        newMotorSettings[key[0]] = data;
      } else {
        const newArr = [...newMotorSettings[key[0]]];
        console.log(newArr);
        const index = parseInt(key[1]);
        console.log(index);
        if (index < newArr.length) {
          newArr[index] = data;
          newMotorSettings[key[0]] = newArr;
        }
      }
      onSettingsChange(newMotorSettings);
    }
  };

  return (
    <VStack minW={200} align="baseline" w="100%">
      <HStack w="100%">
        <Heading size="sm">{`${index}: ${settings.motorType}`} </Heading>
        <Spacer />
        <IconButton
          aria-label="Search database"
          colorScheme="orange"
          icon={<DeleteIcon />}
          onClick={onRemove}
        />
      </HStack>

      <InputField
        title="pin1"
        value={settings.pin1}
        update={(data) => handleInputChange("pin1", data)}
      />

      <InputField
        title="pin2"
        value={settings.pin2}
        update={(data) => handleInputChange("pin2", data)}
      />

      {settings.motorType === "DC" ? (
        <InputField
          title="pin3"
          value={settings.pin3}
          update={(data) => handleInputChange("pin3", data)}
        />
      ) : null}

      <Checkbox
        checked={settings.useTimer}
        onChange={(e) => handleInputChange("useTimer", e.target.checked)}
      >
        timer
      </Checkbox>

      {settings.useTimer ? (
        <InputField
          title="timer"
          value={settings.timer || -1}
          update={(data) => handleInputChange("timer", data)}
          steps={100}
        />
      ) : null}

      <Checkbox
        checked={settings.useEndstops}
        onChange={(e) => handleInputChange("useEndstops", e.target.checked)}
      >
        endstops
      </Checkbox>

      {settings.useEndstops ? (
        <>
          <InputField
            title="endstop1"
            value={settings.endstops ? settings.endstops[0] : -1}
            update={(data) => handleInputChange("endstops-0", data)}
          />

          <InputField
            title="endstop2"
            value={settings.endstops ? settings.endstops[1] : -1}
            update={(data) => handleInputChange("endstops-1", data)}
          />
        </>
      ) : null}
    </VStack>
  );
};

export default Settings;