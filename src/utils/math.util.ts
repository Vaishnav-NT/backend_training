class MathUtil {
    static average(num1: number, num2: number): number {
        return MathUtil.sum(num1, num2) / 2;
    }

    static sum(num1: number, num2: number): number {
        return num1 + num2;
    }
}

export default MathUtil;
