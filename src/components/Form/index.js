import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Vibration, Pressable, FlatList } from "react-native";
import ResultImc from "./ResultImc/index.js";
import styles from "./style.js";


export default function Form() {
    
    const [heigth, setHeigth] = useState(null);
    const [weigth, setWeigth] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);
    
    function imcCalculator() {
        let heightFormat = heigth.replace(",", ".");
        let weigthFormat = weigth.replace(",", ".")
        let totalImc = (weigthFormat / (heightFormat * heightFormat)).toFixed(2);
        setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc);
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
        } else {
            verificationImc();
            setImc(null);
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura")
        }

    }

    return (
        <View style={styles.formContext}>
            { imc == null ? 
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} placeholder="Ex. 1.75" keyboardType="numeric" onChangeText={setHeigth} value={heigth}></TextInput>
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} placeholder="Ex. 75.365" keyboardType="numeric" onChangeText={setWeigth} value={weigth}></TextInput>
                <TouchableOpacity onPress={() => validationImc()} style={styles.buttonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable>
            :   
            <View style={styles.exhibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <TouchableOpacity onPress={() => validationImc()} style={styles.buttonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList showsHorizontalScrollIndicator={false} style={styles.listImcs} data={imcList.reverse()} renderItem={({item}) => {
                return (
                    <Text style={styles.resultImcItem}> 
                        <Text style={styles.textResultItemList}> Resultado IMC = </Text>
                        {item.imc}
                    </Text>
                )
            }} keyExtractor={(item) => {item.id}}>

            </FlatList>
        </View>
    )
}