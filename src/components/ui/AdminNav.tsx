import React from "react";
import { Link } from "react-router-dom";

import { styleSheet } from "@/styles/Form";
import {FaHome, FaUsers, FaTaxi, FaFirstOrder, FaCarCrash, FaCashRegister} from "react-icons/fa";

export function AdminNav(): React.ReactElement {
    return (
        <nav className={`${styleSheet.containerStyles.COLUMN_SMALL_GAP} items-start`}>
            <Link
                to="/admin"
                className={`${styleSheet.inputStyles.BUTTON_SECONDARY} w-full`}
            >
                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                    <FaHome/>Домашня
                </div>
            </Link>

            <Link
                to="/admin/users"
                className={`${styleSheet.inputStyles.BUTTON_SECONDARY} w-full`}
            >
                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                    <FaUsers/>Користувачі
                </div>
            </Link>

            <Link
                to="/admin/cars"
                className={`${styleSheet.inputStyles.BUTTON_SECONDARY} w-full`}
            >
                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                    <FaTaxi/>Автомобілі
                </div>
            </Link>

            <Link
                to="/admin/orders"
                className={`${styleSheet.inputStyles.BUTTON_SECONDARY} w-full`}
            >
                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                    <FaFirstOrder/>Замовлення
                </div>
            </Link>

            <Link
                to="/admin/transactions"
                className={`${styleSheet.inputStyles.BUTTON_SECONDARY} w-full`}
            >
                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                    <FaCashRegister/>Транзакції
                </div>
            </Link>

            <Link
                to="/admin/maintenances"
                className={`${styleSheet.inputStyles.BUTTON_SECONDARY} w-full`}
            >
                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                    <FaCarCrash/>Обслуговування
                </div>
            </Link>
        </nav>
    );
}
