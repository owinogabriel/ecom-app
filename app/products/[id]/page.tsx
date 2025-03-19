import { ProductDetails } from "@/components/product-details";
import { stripe } from "@/lib/stripe";



export default async function ProductPage({
  params, }: {
    params: { id: string };
  }) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"]
  });
  return <ProductDetails product={product}/>
}