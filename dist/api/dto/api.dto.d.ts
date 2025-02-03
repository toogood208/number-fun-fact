export interface SuccessResponse {
    number: number;
    is_prime: boolean;
    is_perfect: boolean;
    properties: string[];
    digit_sum: number;
    fun_fact: string;
}
export interface ErrorResponse {
    number: string | number;
    error: true;
}
export type NumberResponse = SuccessResponse | ErrorResponse;
