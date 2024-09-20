import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Vibration, Pressable } from "react-native";
import ResultImc from "./ResultImc/index.js";
import styles from "./style.js";


export default function Form() {
    
    const [heigth, setHeigth] = useState(null);
    const [weigth, setWeigth] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    
    function imcCalculator() {
        let heightFormat = heigth.replace(",", ".");
        let weigthFormat = weigth.replace(",", ".")

        return setImc((weigthFormat / (heightFormat * heightFormat)).toFixed(2));
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate();
            setErrorMessage("Campo Obrigatório *")
        }
    }

    function validationImc() {
        Keyboard.dismiss();
        if (weigth != null && heigth != null) {
            imcCalculator();
            setHeigth(null);
            setWeigth(null);
            setMessageImc("Seu IMC é igual: ", imc);
            setTextButton("Calcular Novamente");
            setErrorMessage(null)

            return;
        }

        verificationImc();
        setImc(null);
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} placeholder="Ex. 1.75" keyboardType="numeric" onChangeText={setHeigth} value={heigth}></TextInput>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} placeholder="Ex. 75.365" keyboardType="numeric" onChangeText={setWeigth} value={weigth}></TextInput>
                <TouchableOpacity onPress={() => validationImc()} style={styles.buttonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    )
}