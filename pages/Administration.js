import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;

let AddProduct = () => {
    let product = new prisma.product.create()
}

const Admin = () => {
    return ( 
        <h1>Admin</h1>
    );
}
 
export default Admin;