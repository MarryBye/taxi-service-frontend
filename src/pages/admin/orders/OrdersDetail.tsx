import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import { useAdminOrderStat, useAdminOrderInfo } from "@/hooks/useAdmin";
import type { OrdersView, OrdersStatView } from "@/types/views";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminOrderDetailPage(): React.ReactElement {
    const { orderId } = useParams<{ orderId: string }>();
    const id = orderId ? Number(orderId) : null;

    const { data: order, loading: orderLoading, error: orderError } =
        useAdminOrderInfo(id);

    const {
        data: orderStat,
        loading: ordersStatLoading,
        error: ordersStatError,
    } = useAdminOrderStat(id);

    if (orderLoading || ordersStatLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (orderError || !order || ordersStatError || !orderStat) {
        return (
            <AdminLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Помилка завантаження замовлення
                </div>
            </AdminLayout>
        );
    }

    console.log(order, orderStat)

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-8`}
            >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${styleSheet.textStyles.H1} mb-2`}>
                            Замовлення
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Інформація про замовлення
                        </p>
                    </div>

                    <Link
                        to="/admin/orders"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward /> Повернутись
                        </div>
                    </Link>
                </div>

                <div className={styleSheet.containerStyles.CARD}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Клієнт</p>
                            <p className={styleSheet.textStyles.BOLD}>
                                {
                                    <Link
                                        to={`/admin/users/${order.client.id}`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        {order.client.first_name} {order.client.last_name}
                                    </Link>
                                },
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Водій</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {
                                    order.driver ?
                                        (<Link
                                            to={`/admin/users/${order.driver.id}`}
                                            className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                        >
                                            {order.driver?.first_name} {order.driver?.last_name}
                                        </Link>)
                                        :
                                        `Не призначено`
                                },
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Клас авто</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {order.order_class}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Статус</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {order.status}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Маршрут</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {order.route.start_location.country}, {order.route.start_location.city}, {order.route.start_location.street}, {order.route.start_location.house} → {order.route.end_location.country}, {order.route.end_location.city}, {order.route.end_location.street}, {order.route.end_location.house}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Транзакція</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                <Link
                                    to={`/admin/transactions/${order.transaction.id}`}
                                    className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                >
                                    Транзакція №{order.transaction.id}
                                </Link>
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Дата створення</p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Останнє оновлення</p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(order.changed_at).toLocaleString()}
                            </p>
                        </div>

                        {order.finished_at && (
                            <div>
                                <p className={styleSheet.textStyles.SUBTLE}>Завершено</p>
                                <p className={styleSheet.textStyles.SMALL}>
                                    {new Date(order.finished_at).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    <hr className={styleSheet.otherStyles.DIVIDER} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Рейтинг від клієнта
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {orderStat.rating_by_client?.mark ?? "—"}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Рейтинг від водія
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {orderStat.rating_by_driver?.mark ?? "—"}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Тривалість</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {orderStat.duration
                                    ? `${orderStat.duration} хв`
                                    : "—"}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Скасування</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                Ініціатор: {
                                    orderStat.cancel_info
                                    ? ` ${orderStat.cancel_info.canceled_by === order.client.id ? "Клієнт" : "Водій"}`
                                    : "—"
                                }
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                Коментар: {
                                    orderStat.cancel_info
                                    ? `${orderStat.cancel_info.comment}`
                                    : "—"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
