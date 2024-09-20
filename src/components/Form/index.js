import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import ResultImc from "./ResultImc/index.js";
import styles from "./style.js";


export default function Form() {
    
    const [heigth, setHeigth] = useState(null);
    const [weigth, setWeigth] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular")
    
    function imcCalculator() {
        return setImc((weigth.replace(",", ".")/(heigth.replace(",", ".") * heigth.replace(",", "."))).toFixed(2));
    }

    function validationImc() {
        Keyboard.dismiss();
        if (weigth != null && heigth != null) {
            imcCalculator();
            setHeigth(null);
            setWeigth(null);
            setMessageImc("Seu IMC é igual: ", imc);
            setTextButton("Calcular Novamente");
            return;
        }

        setImc(null);
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput style={styles.input} placeholder="Ex. 1.75" keyboardType="numeric" onChangeText={setHeigth} value={heigth}></TextInput>
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput style={styles.input} placeholder="Ex. 75.365" keyboardType="numeric" onChangeText={setWeigth} value={weigth}></TextInput>
                <TouchableOpacity onPress={() => validationImc()} style={styles.buttonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </View>
    )
}