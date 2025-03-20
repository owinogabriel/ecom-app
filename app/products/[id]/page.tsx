import { ProductDetail } from "@/components/product-details";
import { stripe } from "@/lib/stripe";

// Define the expected props for the ProductPage component
interface ProductPageProps {
  params: { id: string }; // Ensure params includes the 'id' field
}

// Next.js does NOT allow async server components by default
// So we keep ProductPage synchronous and delegate async work to a child component
export default function ProductPage({ params }: ProductPageProps) {
  return <ProductFetcher id={params.id} />; // Pass 'id' to a separate async component
}

// Separate async component to fetch the product data
async function ProductFetcher({ id }: { id: string }) {
  try {
    // Fetch product details from Stripe API
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"], // Expanding the default price details
    });

    // Convert product to a plain JavaScript object to avoid serialization issues
    const plainProduct = JSON.parse(JSON.stringify(product));

    // Render the ProductDetail component with the retrieved product data
    return <ProductDetail product={plainProduct} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p className="text-red-500">Failed to load product details.</p>;
  }
}
