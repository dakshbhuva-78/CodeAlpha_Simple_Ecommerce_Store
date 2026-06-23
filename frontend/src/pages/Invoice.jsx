import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getOrderById } from "../services/orderService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Invoice() {

        const invoiceRef = useRef();

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const data =
                    await getOrderById(id);

                setOrder(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchOrder();

    }, [id]);

    if (!order) {

        return (

            <div className="text-center py-20">

                Loading Invoice...

            </div>

        );

    }


    const downloadPDF = async () => {

        const element = invoiceRef.current;

        const canvas =
            await html2canvas(element);

        const imgData =
            canvas.toDataURL("image/png");

        const pdf =
            new jsPDF(
                "p",
                "mm",
                "a4"
            );

        const imgWidth = 190;

        const pageHeight = 295;

        const imgHeight =
            (canvas.height * imgWidth)
            / canvas.width;

        let heightLeft =
            imgHeight;

        let position = 10;

        pdf.addImage(
            imgData,
            "PNG",
            10,
            position,
            imgWidth,
            imgHeight
        );

        heightLeft -= pageHeight;

        while (heightLeft > 0) {

            position =
                heightLeft - imgHeight;

            pdf.addPage();

            pdf.addImage(
                imgData,
                "PNG",
                10,
                position,
                imgWidth,
                imgHeight
            );

            heightLeft -= pageHeight;

        }

        pdf.save(
            `invoice-${order._id}.pdf`
        );

    };

    return (

        <section
            ref={invoiceRef}
            className="max-w-4xl mx-auto p-10 bg-white"
        >
            <h1 className="text-5xl font-bold mb-8">
                Invoice
            </h1>

            <div className="mb-8">

                <p>
                    Invoice ID:
                    {" "}
                    {order._id}
                </p>

                <p>
                    Date:
                    {" "}
                    {new Date(
                        order.createdAt
                    ).toLocaleDateString()}
                </p>

            </div>

            <div className="mb-8">

                <h2 className="text-2xl font-bold mb-4">
                    Customer Details
                </h2>

                <p>
                    {order.shippingInfo.fullName}
                </p>

                <p>
                    {order.shippingInfo.email}
                </p>

                <p>
                    {order.shippingInfo.phone}
                </p>

                <p>
                    {order.shippingInfo.address}
                </p>

                <p>
                    {order.shippingInfo.city},
                    {" "}
                    {order.shippingInfo.state}
                </p>

                <p>
                    {order.shippingInfo.pincode}
                </p>

            </div>

            <table className="w-full border">

                <thead>

                    <tr className="border-b">

                        <th className="p-3">
                            Product
                        </th>

                        <th className="p-3">
                            Qty
                        </th>

                        <th className="p-3">
                            Price
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {order.products.map((item) => (

                        <tr
                            key={item._id}
                            className="border-b"
                        >

                            <td className="p-3">

                                {
                                    item.product.name
                                }

                            </td>

                            <td className="p-3">

                                {
                                    item.quantity
                                }

                            </td>

                            <td className="p-3">

                                ₹
                                {
                                    item.product.price
                                }

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="mt-8 text-right">

                <h2 className="text-3xl font-bold">

                    Total:
                    ₹{order.totalPrice}

                </h2>

            </div>

            <div className="mt-8">

                <button
                    onClick={downloadPDF}
                    className="bg-black text-white px-8 py-3 rounded-full"
                >
                    Download PDF
                </button>

            </div>

        </section>

    );

}

export default Invoice;