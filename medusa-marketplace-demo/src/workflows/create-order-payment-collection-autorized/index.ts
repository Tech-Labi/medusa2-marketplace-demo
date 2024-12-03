import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createOrderPaymentCollectionAutorizedStep } from "./steps/create-order-payment-collection-autorized";

export type CreatePaymentCollectionAutorizedInput = {
  orderId: string;
  amount: number;
  currencyCode: string;
  regionId: string;
};

export const createOrderPaymentCollectionAutorizedWorkflow = createWorkflow(
  "create-order-payment-collection-autorized",
  (input: CreatePaymentCollectionAutorizedInput) => {
    const paymentCollection = createOrderPaymentCollectionAutorizedStep({
      order_id: input.orderId,
      amount: input.amount,
      regionId: input.regionId,
      currencyCode: input.currencyCode,
    });
    return new WorkflowResponse(paymentCollection);
  }
);
