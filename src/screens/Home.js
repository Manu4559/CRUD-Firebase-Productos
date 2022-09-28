import React, { useEffect, useState, useLayoutEffect } from "react";
import { Text, Button, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import db from '../config/fb';
import { collection, onSnapshot, orderBy, query, } from 'firebase/firestore';
import Product from "../components/Products";

const Home = () => {

    const navigation = useNavigation()
    const [products, setProducts] = useState([])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=> <Button title='Add' onPress={()=>navigation.navigate('Add')}/>
        })

    },[])

    useEffect(() => {
        const collectionRef= collection(db, 'products')
        const q = query(collectionRef, orderBy('createAt', 'desc'))
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name,
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createAt: doc.data().createAt
                })
                )
        )})
        return unsuscribe
    }, [])

    return (
        <ScrollView>
            <Text>Products</Text>
            {products.map(product => <Product key={product.id} {...product} />)}
        </ScrollView>
    )
}
export default Home

