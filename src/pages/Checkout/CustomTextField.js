import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { Box } from "@chakra-ui/react";

const CustomTextField = ({ name, label  }) => {
    const { control } = useFormContext();
    return (
        <Box>
            <Controller
                control={control}
                name={name}
                defaultValue=""
                render={({ field }) => <TextField {...field}   label={label}/>}
            />
        </Box>
    );
};

export default CustomTextField;
