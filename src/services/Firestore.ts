import {app} from './Firebase';
import {
    Timestamp,
    collection,
    getFirestore,
    limit,
    orderBy,
    query,
    where,
    getDocs,
    addDoc
} from 'firebase/firestore/lite';

const db = getFirestore(app);
const macaronFlavorsCollection = collection(db, 'MacaronFlavors');
const ordersCollection = collection(db, 'Orders');

export interface MacaronFlavor {
    flavor: string;
}

export interface MacaronCount {
    flavor: string;
    quantity: number;
}

export interface MacaronFlavorSet {
    effectiveAt: Timestamp;
    flavors: MacaronFlavor[];
}

export interface MacaronOrder {
    macarons: MacaronCount[];
    total: number;
    specialInstructions: string;
    name: string;
    email: string;
    phone: string;
}

interface TimedMacaronOrder extends MacaronOrder {
    createdAt: Timestamp;
}

export async function getCurrentMacarons(): Promise<MacaronFlavor[]> {
    const q = query(macaronFlavorsCollection, where('effectiveAt', '<=', Timestamp.now()), orderBy('effectiveAt', 'desc'), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    const flavorSet = snapshot.docs[0].data() as MacaronFlavorSet;
    return flavorSet.flavors;
}

export async function createOrder(order: MacaronOrder): Promise<void> {
    await addOrder({...order, createdAt: Timestamp.now()});
}

async function addOrder(order: TimedMacaronOrder): Promise<void> {
    await addDoc(ordersCollection, order);
}
