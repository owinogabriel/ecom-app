import { ProductDetail } from "@/components/product-details";
import { stripe } from "@/lib/stripe";

// Define props structure
type ProductPageProps = {
  params: { id: string }; // Ensure params contains an 'id' string
};

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    if (!params?.id) throw new Error("Product ID is missing");

    // Fetch product details from Stripe API
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    // Convert product to a plain JavaScript object to avoid serialization issues
    const plainProduct = JSON.parse(JSON.stringify(product));

    // Render the ProductDetail component with the retrieved product data
    return <ProductDetail product={plainProduct} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p>Error loading product details.</p>;
  }
}
