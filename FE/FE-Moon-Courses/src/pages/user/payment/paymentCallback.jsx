import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { paymentCallback } from "../../../services/apiServices";
import toast from "react-hot-toast";

function PaymentCallback() {
  const navigation = useNavigate();

  useEffect(() => {
    const fetchPaymentCallback = async () => {
      try {
        const searchParams = window.location.search;
        const res = await paymentCallback(searchParams);

        if (res.status === 200) {
          toast.success("Payment success!");
          navigation("/");
        } else {
          toast.error("Payment failed!");
          navigation("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentCallback();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
}
export default PaymentCallback;
