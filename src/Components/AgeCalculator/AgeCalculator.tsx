import { Box, Container, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Text, Image, Input, Stack, Center } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import downArrow from '../../assets/images/icon-arrow.svg'


interface DOB {
    day?: string,
    month?: string,
    year?: string
}

interface CalculatedAge {
    years: number;
    months: number;
    days: number
}

export const AgeCalculator = () => {
    const [dob, setDob] = useState<DOB | null>(null);
    const [age, setAge] = useState<CalculatedAge | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let validatedValue = value;

        if (name === 'month') {
            const monthNumber = Number(value);
            if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
                validatedValue = '';
            } else {
                const { day: prevDay, year: prevYear } = dob || {};
                const prevMonth = prevDay && prevYear ? Number(prevDay) - 1 : 0;
                const maxDay = new Date(Number(prevYear), prevMonth, 0).getDate();

                if (prevDay && Number(prevDay) > maxDay) {
                    validatedValue = '';
                }
            }
        }

        if (name === 'day') {
            const dayNumber = Number(value);
            if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
                validatedValue = '';
            } else {
                const { month: prevMonth, year: prevYear } = dob || {};
                const maxDay = new Date(Number(prevYear), Number(prevMonth), 0).getDate();

                if (prevMonth && Number(value) > maxDay) {
                    validatedValue = '';
                }
            }
        }

        setDob({
            ...dob,
            [name]: validatedValue,
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };


    const handleSubmit = () => {
        const newErrors: Record<string, string> = {};

        const { day, month, year } = dob || {};

        const today = new Date();
        if (!day || !month || !year) {
            if (!day) {
                newErrors.day = 'Must be a valid day';
            }
            if (!month) {
                newErrors.month = 'Must be a valid month';
            }
            if (!year) {
                newErrors.year = 'Must be a valid year';
            }

            setErrors(newErrors);
            return;
        }

        const birthYear = new Date(Number(year), Number(month) - 1, Number(day));

        if (birthYear.getFullYear() > today.getFullYear()) {
            newErrors.year = 'Must be in the past';
        }

        if (Number(month) > 12) {
            newErrors.month = 'Must be a valid month';
        }

        if (Number(day) > 31) {
            newErrors.day = 'Must be a valid month';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Reset errors if no validation issues
        setErrors({});

        let ageYears = today.getFullYear() - birthYear.getFullYear();
        let ageMonths = today.getMonth() - birthYear.getMonth();
        let ageDays = today.getDate() - birthYear.getDate();

        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths += 12;
        }

        if (ageDays < 0) {
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
            ageDays += lastMonth.getDate();
            ageMonths--;
        }

        const calculatedAge = {
            years: ageYears,
            months: ageMonths,
            days: ageDays,
        };

        setAge(calculatedAge);
    };


    return (
        <>
            <Container py={8} mx={8} color='black'
                bgColor='hsl(0, 0%, 100%)'
                h='80vh'
                borderRadius='30px'
                borderBottomRightRadius={{ base: '100px', md: '120px', lg: '150px' }}

            >
                <form>
                    <Stack direction='row' spacing={4}>
                        <Box flex='1'>
                            <FormControl isInvalid={!!errors.day}>
                                <FormLabel color={errors.day ? 'red' : ''}>DAY</FormLabel>
                                <Input
                                    placeholder="DD"
                                    name='day'
                                    type='text'
                                    borderColor='black'
                                    _hover={{ borderColor: 'black' }}
                                    _placeholder={{ color: 'black', fontWeight: '500' }}

                                    onChange={handleChange}
                                    fontWeight='800'


                                />
                                {errors.day && <FormErrorMessage>{errors.day}</FormErrorMessage>}

                            </FormControl>
                        </Box>
                        <Box flex='1'>
                            <FormControl isInvalid={!!errors.month}>
                                <FormLabel color={errors.day ? 'red' : ''}>MONTH</FormLabel>
                                <Input
                                    placeholder="MM"
                                    name='month'
                                    type='text'
                                    borderColor='black'
                                    _hover={{ borderColor: 'black' }}
                                    _placeholder={{ color: 'black', fontWeight: '500' }}

                                    onChange={handleChange}
                                    fontWeight='800'
                                />
                                {errors.month && <FormErrorMessage>{errors.month}</FormErrorMessage>}

                            </FormControl>
                        </Box>
                        <Box flex='1'>
                            <FormControl isInvalid={!!errors.year}>
                                <FormLabel color={errors.day ? 'red' : ''}>YEAR</FormLabel>
                                <Input
                                    placeholder="YYYY"
                                    name='year'
                                    type='text'
                                    borderColor='black'
                                    _hover={{ borderColor: 'black' }}
                                    _placeholder={{ color: 'black', fontWeight: '500' }}
                                    onChange={handleChange}
                                    fontWeight='800'


                                />
                                {errors.year && <FormErrorMessage>{errors.year}</FormErrorMessage>}

                            </FormControl>
                        </Box>
                    </Stack>
                    <Flex
                        display="flex"
                        m={2}
                        alignItems="center"
                    >
                        <Box flex="1">
                            <Divider orientation="horizontal" borderColor="gray" />
                        </Box>
                        <Box
                            bgColor="hsl(259, 100%, 65%)"
                            w="80px"
                            h="80px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="full"
                            onClick={() => handleSubmit()}
                            _hover={{ cursor: 'pointer' }}
                        >
                            <Image
                                w="40px"
                                src={downArrow}
                            />
                        </Box>
                    </Flex>
                </form>

                <Center>

                    <Box
                        fontWeight={"extrabold"}
                        fontSize={{ base: '3em', md: '4em' }}
                        fontStyle={"italic"}
                    // p='0'
                    >
                        <Box
                            display='flex'

                        >{age && (age.years || age.years === 0) ? <Text
                            mx={2}
                            color='hsl(259, 100%, 65%)'>{age.years}</Text> : <Text color='hsl(259, 100%, 65%)' >--</Text>} years</Box>
                        <Box
                            display='flex'
                        >{age && (age.months || age.months === 0) ? <Text
                            mx={2}
                            color='hsl(259, 100%, 65%)'>{age.months}</Text> : <Text color='hsl(259, 100%, 65%)'>--</Text>} months</Box>
                        <Box
                            display='flex'
                        >{age && (age.days || age.days === 0) ? <Text
                            mx={2}
                            color='hsl(259, 100%, 65%)'>{age.days}</Text> : <Text color='hsl(259, 100%, 65%)'>--</Text>} days</Box>
                    </Box>
                </Center>





            </Container>

        </>
    );
}