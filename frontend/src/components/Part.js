import {Center,AddContainer,AddLabel,AddInput,AddInputDiv,FlexDiv,StyledButton} from "../styles/stylePart";
import React from "react";

/** onClick={함수},text='버튼에 넣을 text' */

const AddInputs =({label,value,onChange,placeholder,buttonText,onClick})=>{
    return(
    <Center>
        <AddInputDiv>
            <FlexDiv><AddLabel>{label}</AddLabel>{buttonText? <StyledButton onClick={onClick}>{buttonText}</StyledButton>:''}</FlexDiv>
            <AddInput value={value} onChange={onChange} placeholder={placeholder} />
        </AddInputDiv>
    </Center>
    )
}


export {AddInputs}