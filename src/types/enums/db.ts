export type CarStatuses =
    'available' |
    'on_maintenance' |
    'busy' |
    'not_working';

export type CarClasses =
    'standard' |
    'comfort' |
    'business';

export type MaintenanceStatuses =
    'diagnosis' |
    'in_progress' |
    'completed';

export type OrderStatuses =
    'searching_for_driver' |
    'waiting_for_driver' |
    'waiting_for_client' |
    'in_progress' |
    'waiting_for_marks' |
    'canceled' |
    'completed';

export type TransactionType =
    'debit' |
    'credit' |
    'refund' |
    'penalty';

export type PaymentMethods =
    'credit_card' |
    'cash';

export type BalanceTypes =
    'payment' |
    'earning';

export type UserRoles =
    'admin' |
    'driver' |
    'client' |
    'guest';

export type ClientTags =
    'accurate' |
    'friendly' |
    'respectful' |
    'communicative' |
    'polite' |
    'on_time' |
    'clear_instructions' |
    'calm' |
    'helpful' |
    'other';

export type DriverTags =
    'accurate' |
    'fast' |
    'friendly' |
    'clean' |
    'modern_car' |
    'polite' |
    'communicative' |
    'helpful' |
    'smooth_driving' |
    'safe_driving' |
    'good_navigation' |
    'other';

export type DriverCancelTags =
    'client_not_responding' |
    'client_not_at_pickup_point' |
    'vehicle_breakdown' |
    'traffic_accident' |
    'unsafe_pickup_location' |
    'route_unreachable' |
    'emergency' |
    'other';

export type ClientCancelTags =
    'driver_too_far' |
    'long_wait_time' |
    'changed_plans' |
    'wrong_pickup_location' |
    'found_another_transport' |
    'driver_not_responding' |
    'price_too_high' |
    'emergency' |
    'other';

export type Colors =
    'red' |
    'blue' |
    'green' |
    'black' |
    'white' |
    'yellow' |
    'orange' |
    'purple' |
    'brown' |
    'pink' |
    'gray' |
    'silver' |
    'gold';