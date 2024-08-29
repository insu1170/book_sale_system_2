import {Center,AddContainer,AddLabel,AddInput,AddInputDiv,FlexDiv,StyledButton} from "../styles/stylePart";
import React from "react";
import styled from "styled-components";

/** onClick={함수},text='버튼에 넣을 text' */

const AddInputs =({label,value,onChange,placeholder,buttonText,onClick,name,text})=>{
    return(
    <Center>
        <AddInputDiv>
            <FlexDiv>
                <AddLabel>{label}</AddLabel>
                {buttonText? <StyledButton onClick={onClick}>{buttonText}</StyledButton>:''}
                {text? <div>{text}</div>:""}
            </FlexDiv>
            <AddInput value={value} onChange={onChange} placeholder={placeholder} name={name} />
        </AddInputDiv>
    </Center>
    )
}

export {AddInputs}