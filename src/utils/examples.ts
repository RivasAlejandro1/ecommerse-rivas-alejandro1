
export const signinExample = {
    schema: {
        type: "object",
        properties: {
            email: {type: "string"},
            password: {type: "string"}
        }
    },
    examples: { 
        example1: {
            value: {
                email: "pedro123@example.com",
                password: "Al123*banes"
                }
        },
        example2: {
            value: {
                email: "Veronicca1234@example.com",
                password: "Al123*Veronicca"
                }
        }
    }
}


export const signupExample = {
    schema: {
        type: "object",
        properties: {
            name: {type: "string"},
            email: {type: "string"},
            password: {type: "string"},
            confirmationPassword: {type: "string"},
            address: {type: "string"},
            phone: {type: "number"},
            country: {type: "string"},
            city: {type: "string"}
        }
    },
    examples: { 
        example1: {
            value: {
                name: "Blacky",
                email: "pedro123@example.com",
                password: "Al123*banes",
                confirmationPassword: "Al123*banes",
                address: "Urbanización los llaneros - edificio 2 - 3er piso apartamento 2",
                phone: 1234567890,
                country: "Unite State",
                city: "New York",
                }
        },
        example2: {
            value: {
                name: "Veronicca",
                email: "Veronicca1234@example.com",
                password: "Al123*Veronicca",
                confirmationPassword: "Al123*Veronicca",
                address: "Urbanización la montañita - edificio 4 - 6er piso apartamento 6",
                phone: 1234567890,
                country: "España",
                city: "Barcelona",
                }
        }
    }
}



export const productsExample ={
    schema: {
        type: "object",
        properties: {
            name: {type: "string"},
            description: {type: "string"},
            price: {type: "number"},
            stock: {type: "number"},
            imgUrl: {type: "string"}
        }
    },
    examples: { 
        example1: {
            value: {
                name: 'Ejemplo Producto',
                description: 'Este es un ejemplo de descripción de un producto.',
                price: 29.99,
                stock: 100,
                imgUrl: 'https://media.istockphoto.com/id/1089643450/es/foto/cart%C3%B3n-de-bo%C3%AEte-en-vide-et-ouverte.jpg?s=1024x1024&w=is&k=20&c=ercOUDSYja38T4FANZ7mNOF_gs7EYnUN9GvFJkSXSfg='
            }
        }
    }
}


export const usersPutExample ={
    schema: {
        type: "object",
        properties: {
            name: {type: "string"},
            email: {type: "string"},
            password: {type: "string"},
            address: {type: "string"},
            phone: {type: "number"},
            country: {type: "string"},
            city: {type: "string"}
        }
    },
    examples: { 
        example1: {
            value: {
                name: "Blacky",
                email: "pedro123@example.com",
                password: "Al123*perro",
                address: "Dirección de ejemplo",
                phone: 1234567890,
                country: "País",
                city: "Ciudad"
            }
        }
    }
}



export const ordersExample ={
    schema: {
        type: "object",
        properties: {
            userId: {type: "string"},
            products: {type: "array"}
        }
    },
    examples: { 
        example1: {
            value: {
                userId: "asfsfa-asdfsdfasdf-asdfasdfasdf-asdf",
                products:  ["asfsfa-asdfsdfasdf-asdfasdfasdf-asdf", "asfsfa-asdfsdfasdf-asdfasdfasdf-asdf"]
            }
        }
    }
}