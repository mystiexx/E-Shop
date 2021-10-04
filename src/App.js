import Home from "./pages/Home/Home";
import { VStack } from "@chakra-ui/react";
import NavBar from "./pages/NavBar/NavBar";
import { useState, useEffect } from "react";
import Cart from "./pages/Cart/Cart";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./pages/Checkout/Checkout";
import HomePage from "./pages/LandingPage/Index";
import Other from "./pages/Home/Other";
import { PUBLIC_PATHS } from "./components/constants";
import PageSpinner from "./components/FullPageSpinner";

const App = ({ props }) => {
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState(" ");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);

    const [loading, setLoading] = useState(true);

    console.log(products)

    const handleSearch = (e) => {
        let string = e.target.value;
        if(string ===" ") {
            setProducts(products)
        } else {
            let data = product.filter(
                (content ) => 
                content.name.toLowerCase().includes(string.toLowerCase())
            );
            setProducts(data)
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await commerce.products.list();
            setProducts(data) ||
            setProduct(data) ||
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const getCategories = async () => {
        const { data } = await commerce.categories.list();
        setCategories(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (err) {
            setErrorMessage(err.data.error.message);
        }
    };

    useEffect(() => {
        fetchCart();
        getCategories();
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (
                <PageSpinner />
            ) : (
                <Router>
                    <VStack>
                        <NavBar totalItems={cart.total_items} handleSearch={handleSearch}/>
                        <Switch>
                            <Route exact path={PUBLIC_PATHS.LANDING}>
                                <HomePage
                                    products={products}
                                    onAddToCart={handleAddToCart}
                                    loading={loading}
                                />
                            </Route>

                            <Route exact path={PUBLIC_PATHS.HOME}>
                                <Home
                                    onAddToCart={handleAddToCart}
                                    categories={categories}
                                    products={products}
                                    {...props}
                                />
                            </Route>

                            <Route exact path={PUBLIC_PATHS.CATEGORY}>
                                <Other
                                    categories={categories}
                                    products={products}
                                    onAddToCart={handleAddToCart}
                                />
                            </Route>

                            <Route exact path={PUBLIC_PATHS.CART}>
                                <Cart
                                    handleRemoveFromCart={handleRemoveFromCart}
                                    handleEmptyCart={handleEmptyCart}
                                    handleUpdateCartQty={handleUpdateCartQty}
                                    cart={cart}
                                />
                            </Route>

                            <Route exact path={PUBLIC_PATHS.CHECKOUT}>
                                <Checkout
                                    order={order}
                                    onCaptureCheckout={handleCaptureCheckout}
                                    error={errorMessage}
                                    cart={cart}
                                />
                            </Route>
                        </Switch>
                    </VStack>
                </Router>
            )}
        </>
    );
};

export default App;
