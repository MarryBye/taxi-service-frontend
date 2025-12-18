export type CarStatus = (
    'available' |
    'on_maintenance' |
    'busy' |
    'not_working'
)

export type CarClass = (
    'standard' |
    'comfort' |
    'business'
)

export type MaintenanceStatus = (
    'diagnosis' |
    'in_progress' |
    'completed'
)

export type OrderStatus = (
    'searching_for_driver' |
    'waiting_for_driver' |
    'waiting_for_client' |
    'in_progress' |
    'waiting_for_marks' |
    'canceled' |
    'completed'
)

export type TransactionType = (
    'debit' |
    'credit' |
    'refund' |
    'penalty'
)

export type PaymentMethod = (
    'cash' |
    'credit_card'
)

export type BalanceType = (
    'payment' |
    'earning'
)

export type UserRole = (
    'admin' |
    'driver' |
    'client' |
    'guest'
)

export type CityName = (
    'Kyiv' |
    'Lviv' |
    'Odessa' |
    'Dnipro' |
    'Kharkiv'
)

export type CountryName = (
    'Ukraine'
)

export type ClientTag = (
    'accurate' |
    'friendly' |
    'respectful' |
    'communicative' |
    'polite'
)

export type DriverTag = (
    'accurate' |
    'fast' |
    'friendly' |
    'clean' |
    'modern_car' |
    'polite' |
    'communicative' |
    'helpful'
)

export type DriverCancelTag = (
    'reason 1' |
    'reason 2' |
    'reason 3'
)

export type ClientCancelTag = (
    'reason 1' |
    'reason 2' |
    'reason 3'
)