import { async } from "@firebase/util";
import { collection, doc, getDocs, orderBy, setDoc, query } from "firebase/firestore"
import { firestore } from "../../firebase.config"

// Saving new items
export const saveItem = async (data) => {
    await setDoc(
        doc(firestore, 'foodItems', `${Date.now()}`),  data, { merge: true, }
    );
};

// Get all food items

export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, 'foodItems'), orderBy('id'))
    );
    console.log(items);
    return items.docs.map((doc) => doc.data());
}