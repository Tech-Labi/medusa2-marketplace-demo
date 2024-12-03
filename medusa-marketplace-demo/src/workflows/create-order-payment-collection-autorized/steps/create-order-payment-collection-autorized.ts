import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import {
  ContainerRegistrationKeys,
  Modules,
  PaymentCollectionStatus,
} from "@medusajs/framework/utils";
import { IPaymentModuleService } from "@medusajs/framework/types";

export type CreateOrderPaymentCollectionAutorizedInput = {
  order_id: string;
  amount: number;
  currencyCode: string;
  regionId: string;
};

export const createOrderPaymentCollectionAutorizedStep = createStep(
  "create-order-payment-collection-autorized-step",
  async (input: CreateOrderPaymentCollectionAutorizedInput, { container }) => {
    const paymentModuleService = container.resolve<IPaymentModuleService>(
      Modules.PAYMENT
    );

    // create payment
    const paymentCollections =
      await paymentModuleService.createPaymentCollections([
        {
          region_id: input.regionId,
          currency_code: input.currencyCode,
          amount: input.amount,
          status: PaymentCollectionStatus.AUTHORIZED,
          authorized_amount: input.amount,
          captured_amount: input.amount,
        } as any,
      ]);
    const paymentCollectionId = paymentCollections[0].id;

    // connect order & payment
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    await remoteLink.create({
      [Modules.ORDER]: {
        order_id: input.order_id,
      },
      [Modules.PAYMENT]: {
        payment_collection_id: paymentCollectionId,
      },
    });

    return new StepResponse(paymentCollections[0], {
      paymentCollectionId,
      orderId: input.order_id,
    });
  },
  async ({ paymentCollectionId, orderId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    remoteLink.dismiss({
      [Modules.ORDER]: {
        order_id: orderId,
      },
      [Modules.PAYMENT]: {
        payment_collection_id: paymentCollectionId,
      },
    });

    const paymentModuleService = container.resolve<IPaymentModuleService>(
      Modules.PAYMENT
    );
    await paymentModuleService.deletePaymentCollections([paymentCollectionId]);
  }
);
